<template>
	<DevOnly>
		<div class="container pt-9 space-y-4 pb-20">
			<div>
				<input class="form-control" type="text">
			</div>
			<div class="flex gap-4">
				<select class="form-select">
					<option value="" selected>Популярные</option>
					<option value="">Новинки</option>
				</select>
				<select class="form-select is-invalid">
					<option value="" selected>Популярные</option>
					<option value="">Новинки</option>
				</select>
				<select class="form-select" disabled>
					<option value="" selected>Популярные</option>
					<option value="">Новинки</option>
				</select>
			</div>
			<div class="space-y-3">
				<FormCheck>Кроссовки</FormCheck>
				<FormCheck v-model="s" value="Зимняя обувь">Зимняя обувь</FormCheck>
				<FormCheck v-model="s" value="Лоферы">Лоферы</FormCheck>
				<FormCheck v-model="s" value="Кеды">Кеды</FormCheck>
				<FormCheck v-model="b">Туфли</FormCheck>
			</div>
			<div>
				<FormRange class="max-w-xs" v-model:left="rangeL" v-model:right="rangeR" :min="50000" :max="100000" />
				<div class="form-range__text-inputs">
					<div class="form-range__input-wrapper">
						<div class="form-range__input-label">
							<span>от</span>
							<span>₽</span>
						</div>
						<input class="form-control" type="number" v-model="rangeL">
					</div>
					<div class="form-range__input-wrapper">
						<div class="form-range__input-label">
							<span>до</span>
							<span>₽</span>
						</div>
						<input class="form-control" type="number" v-model="rangeR">
					</div>
				</div>
			</div>
		</div>
	</DevOnly>
</template>

<script setup lang="ts">

import FormCheck from '~/components/common/form-check/FormCheck.vue'
import FormRange from '~/components/common/FormRange.vue'
import { ref, reactive } from '#imports'

const s = ref([])
const b = ref(false)

const rangeL = ref(50000)
const rangeR = ref(100000)

</script>
