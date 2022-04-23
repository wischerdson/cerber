<template>
	<div>Catalog "{{ storeName }}" hhh</div>
</template>

<script>

	export default {
		async asyncData ({ params }) {
			const p = new Promise(r => r());

			await p

			return {
				storeName: params.pathMatch
			}
		},
		data () {
			return {

			}
		}
	}

</script>
