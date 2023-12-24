
// import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// export const langEN = writable(
//     browser ? localStorage.getItem('lang') === 'en' ? true : false : true
// );

// langEN.subscribe((value) => {
//     if (browser) {
//         localStorage.setItem('lang', value ? 'en' : 'ar');
//     }
// });


export const dialogObj = writable({
    open: false,
    title: '',
    text: '',
    icon: '',
    onClose: () => { }
});


export const videoID = writable("");
export const video = writable({});

export const appLoading = writable(true);
