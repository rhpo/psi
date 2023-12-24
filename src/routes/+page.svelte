<script>
	// @ts-nocheck

	import {
		faBackward,
		faPaperPlane,
		faSearch,
		faSpinner,
		faUser,
		faUserCircle,
		faWifi,
		faWifi3,
		faX
	} from '@fortawesome/free-solid-svg-icons';
	import { faYoutube } from '@fortawesome/free-brands-svg-icons';
	import { videoID, video } from '$lib/store';
	import { onDestroy, onMount } from 'svelte';
	// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

	import Input from '$lib/ui/Input.svelte';
	import Button from '$lib/ui/Button.svelte';
	import Fa from 'svelte-fa';
	import Long from '$lib/ui/Long.svelte';
	import tilt from 'vanilla-tilt-svelte';
	import Youtube, { videoId } from '$lib/components/Youtube.svelte';
	import { browser } from '$app/environment';

	function watch(id) {
		videoID.set(id.videoId);
		video.set(id);
	}

	let isOnline = false;

	function updateOnlineStatus() {
		isOnline = navigator.onLine;
	}

	function arabic(string) {
		let def = 0;
		let ar = 0;

		string.split('').forEach(i => /[\u0600-\u06FF]/.test(i) ? (ar++) : (def++))

		return (ar > def);
	}

	onMount(() => {
		updateOnlineStatus();

		window.addEventListener('online', updateOnlineStatus);
		window.addEventListener('offline', updateOnlineStatus);

		onDestroy(() => {
			window.removeEventListener('online', updateOnlineStatus);
			window.removeEventListener('offline', updateOnlineStatus);
		});
	});

	let videos = [];

	let loading = false;

	function search(text) {
		loading = true;
		fetch(`https://psi.varchardev.repl.co/api/v1/youtube/search?query=${encodeURIComponent(text)}}`)
			.then((res) => res.json())
			.then((data) => {
				loading = false;
				videos = data.videos.map((item) => ({
					ago: item.ago,
					author: item.author, // { name, url }
					description: item.description,
					duration: item.duration,
					image: item.image,
					seconds: item.seconds,
					thumbnail: item.thumbnail,
					timestamp: item.timestamp,
					title: item.title,
					type: item.type,
					url: item.url,
					videoId: item.videoId
				}));
			});
	}

	let value = '';
	function searchFunc() {
		search(value);
	}
</script>

{#if !$videoID}
	<div class="row">
		<Input placeholder="Search" icon={faSearch} bind:value />
		<Button
			icon={faPaperPlane}
			bind:loader={loading}
			onClick={searchFunc}
			color="red"
			textColor="white"
		/>
	</div>

	{#if isOnline}
		{#if videos.length === 0}
			<h1><span class="red"><Fa icon={faSpinner} spin /></span> Type Something</h1>
		{:else}
			<div class="videos">
				{#each videos as video}
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="video" on:click={() => watch(video)} use:tilt>
						<div class="picture">
							<img src={video.thumbnail} alt={video.title} />
						</div>

						<div class="info">
							<h3>{video.title}</h3>
							<p class="author">
								<Fa icon={faUserCircle} />
								{video.author.name}
							</p>
							<Long max={50} text={video.description} />
						</div>

						<hr width="30" />
					</div>
				{/each}
			</div>
		{/if}
	{:else}
		<h1>
			<span class="red"><Fa icon={faWifi3} /></span> You are offline
		</h1>
	{/if}

{:else}
		{#if browser}
			<div class="screen" transition:blur class:arabic={arabic($video.title)}>
				<div class="youtube">
					<iframe
						width="560"
						height="315"
						src={`https://www.youtube.com/embed/${$videoID}`}
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					/>
				</div>

				{#if $video}
					<div class="row">
						<h1>{$video.title}</h1>
					</div>

					<div class="row">
						<Long text={$video.description} />
					</div>

					<Button fullw icon={faBackward} onClick={() => videoID.set(null)} color="red" textColor="white">
						Back to Videos list
					</Button>
				{/if}
			</div>
		{/if}
{/if}

<style>

	.youtube {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.row {
		display: flex;
		gap: 15px;
		width: 100%;
	}

	h1 {
		text-align: center;
		margin-top: 50px;
		font-size: 20px;
	}

	.red {
		color: red;
	}

	:global(.row > .input-ui-wrapper) {
		width: 100%;
	}

	.videos {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.video {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 10px;

		transition: 0.1s ease-in-out;
	}

	.video:active {
		padding: 10px;
		background-color: rgb(219, 219, 219);
	}

	.video .picture {
		width: 100%;
		height: 200px;
		overflow: hidden;
		border-radius: 10px;
	}

	.video .picture img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.video .info {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.info h3 {
		font-size: 16px;
		margin-bottom: 0;
	}

	:global(.info p) {
		margin-top: 0;
		margin-bottom: 5px;
		font-size: 14px;
	}

	.screen h1 {
		font-size: 50px;
		text-align: left;
		margin-bottom: 10px;
	}

	.screen.arabic h1 {
		text-align: right;
	}

	:global(.screen p) {
		font-size: 20px;
		margin-bottom: 25px;
		text-align: left;
	}

	:global(.screen.arabic p) {
		text-align: right;
	}
</style>
