// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../../scripts/service-worker.js?v=1.0.0.5').then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        }, error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}

// Install button logic
let deferredPrompt;
const installButton = document.getElementById('installButton');
/*installButton.style.display = 'block';*/



window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    

    installButton.addEventListener('click', () => {

        deferredPrompt.prompt();


        caches.keys().then((cacheNames) => {
            console.log('Console Name Before');
            console.log(cacheNames);
            cacheNames.forEach(cacheName =>
                caches.delete(cacheName)
            );
        });

        console.log(caches);

        installButton.innerHTML = 'Installing...';
        setTimeout(function () {
            deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    deferredPrompt = null;
                    console.log('User accepted the install prompt');
                    installButton.innerHTML = 'Installed.';
                } else {
                    deferredPrompt = null;
                    console.log('User dismissed the install prompt');
                    installButton.innerHTML = 'Install App';
                }

            });
        }, 2000);
        
    });
});

 


