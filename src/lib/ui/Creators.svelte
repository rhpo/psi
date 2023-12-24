<script>

    // @ts-nocheck

	import { langEN } from '$lib/store';
	import svelteTilt from 'vanilla-tilt-svelte';
    export let data = {};

    $: creators = Object.keys(data.list).filter(c => c.startsWith('@')).map((key) => data.list[key]);

</script>

{#key $langEN}
    <div class="creators">
        {#each creators as creator, i}
            <div class="wrapper" data-aos="fade-left" data-aos-delay={200 * i}>
                <div
                    class="creator{creator.scale ? ' scaled' : ''}"
                    use:svelteTilt={{
                        glare: true,
                        max: 8,
                        perspective: 1000,
                        startX: 0,
                        startY: 0
                    }}
                >
                    <img class="picture" src={creator.$picture} alt="creator's View" />

                    <div class="about">
                        <h1>
                            {
                                $langEN
                                    ? creator.name.english
                                    : creator.name.arabic
                            }
                        </h1>
                        <p class="profession">{
                            $langEN
                                ? creator.profession.english
                                : creator.profession.arabic
                        }</p>
                        <p class="description">{
                            $langEN
                                ? creator.description.english
                                : creator.description.arabic
                        }</p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/key}

<style>

	.creator {
		border: 0 !important;
		background-color: var(--color-bg-1);
	}

    .creators {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: stretch;

		gap: 20px;

		width: 100%;
		max-width: 1440px;
	}

    .wrapper {
		flex: 1;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.picture {
		width: 100%;
		transition: all 0.2s;
	}

	.profession {
		color: gainsboro;
		letter-spacing: 0;
		font-size: 14px;
	}

	.about {
		padding: 25px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.creator {
		width: 100%;
		height: 100%;
		max-width: 450px;

		padding: 0;
		/* background-color: var(--color-bg-3); */

		transform-style: preserve-3d;

		overflow: hidden;

		border: 5px solid black;
	}

	/* :global(.creator.scaled) {
            transform: scale(1.1);
        } */

	.creator {
		transform-style: preserve-3d;
	}

	.creator {
		border-radius: 20px;
	}

	.picture {
		transform: scale(1.01);
	}

	.creator h1 {
		font-size: 30px;
		line-height: 30px;
        margin: 0;
		color: var(--color-theme-1);
	}

	.creator .description {
		font-size: 16px;
		margin: 5px;
		color: var(--color-bg-3);
	}

	@media screen and (max-width: 825px) {
		.creators {
			flex-direction: column;
			gap: 10vw;
			padding-top: 2vw;
		}
	}
</style>
