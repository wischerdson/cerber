<?php

namespace App\Services;

use App\Models\EntryPoint;
use App\Models\PasswordReset as PasswordResetModel;

class PasswordReset
{
	public const CODE_LENGTH = 6;

	public const MAX_ATTEMPTS_COUNT = 3;

	public const MAX_RESETS_COUNT_FOR_THE_HOUR = 4;

	/**
	 * Инициирование процедуры восстановления пароля по email
	 *
	 * @return string UUID модели сброса пароля
	 */
	public function initiateByEmail(string $email): string
	{
		$entryPoint = EntryPoint::where('login', $email)
			->where('provider', 'email')
			->first();

		return $this->initiate($entryPoint);
	}

	/**
	 * Инициирование процедуры восстановления пароля
	 *
	 * @throws \App\Exceptions\UserNotFoundException
	 * @throws \App\Exceptions\TooOfterResetPasswordException
	 * @return string UUID модели сброса пароля
	 */
	public function initiate(?EntryPoint $entryPoint): string
	{
		if (!$entryPoint) {
			throw new \App\Exceptions\UserNotFoundException();
		}

		if ($this->countInitiatedResetsForTheLastHour($entryPoint) >= self::MAX_RESETS_COUNT_FOR_THE_HOUR) {
			throw new \App\Exceptions\TooOfterResetPasswordException();
		}

		return $this->createPasswordReset($entryPoint)->id;
	}

	public function countInitiatedResetsForTheLastHour(EntryPoint $entryPoint)
	{
		return PasswordResetModel::where('entry_point_id', $entryPoint->id)
			->where('created_at', '>', now()->subHour())
			->count();
	}

	/**
	 * Пытается найти модель сброса пароля со всеми надлежащими условиями
	 *
	 * @throws \App\Exceptions\PasswordResetNotFoundException
	 */
	public function getModelByUUID(string $uuid): PasswordResetModel
	{
		$passwordReset = PasswordResetModel::whereKey($uuid)
			->where('attemps', '<', self::MAX_ATTEMPTS_COUNT)
			->where('used', false)
			->where('expire_at', '>', now()->toDateTimeString())
			->first();

		if ($passwordReset) {
			return $passwordReset;
		}

		throw new \App\Exceptions\PasswordResetNotFoundException();
	}

	/**
	 * Попытка подтверждения кода сброса пароля
	 *
	 * @throws \App\Exceptions\InvalidPasswordResetCodeException
	 */
	public function attemptToConfirm(string $uuid, string $code)
	{
		$passwordReset = $this->getModelByUUID($uuid);

		if ($passwordReset->code === $code) {
			return $passwordReset->token;
		}

		$passwordReset->increment('attemps');

		throw new \App\Exceptions\InvalidPasswordResetCodeException();
	}

	/**
	 * @throws \App\Exceptions\PasswordResetNotFoundException
	 */
	public function changePassword(string $uuid, string $token, string $newPassword)
	{
		$passwordReset = $this->getModelByUUID($uuid);

		if ($passwordReset->token !== $token) {
			throw new \App\Exceptions\PasswordResetNotFoundException();
		}

		$passwordReset->update(['used' => true]);

		$entryPoint = $passwordReset->entryPoint;
		$entryPoint->password = $newPassword;

		return $entryPoint->save();
	}

	private function createPasswordReset(EntryPoint $entryPoint): PasswordResetModel
	{
		$passwordReset = new PasswordResetModel();
		$passwordReset->code = $this->generateCode();
		$entryPoint->passwordResets()->save($passwordReset);

		return $passwordReset;
	}

	/**
	 * Генерация кода подтверждения
	 */
	private function generateCode(): string
	{
		$result = '';

		while (mb_strlen($result) < self::CODE_LENGTH) {
			$result .= (string) random_int(0, 9);
		}

		return $result;
	}
}
