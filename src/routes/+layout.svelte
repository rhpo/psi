<script>
    import '../style.css'
	import Nav from "$lib/components/Nav.svelte";

</script>

<Nav />

<main>
    <slot />
</main>

<style>
    main {
        padding: 0 var(--space);
    }
</style>
