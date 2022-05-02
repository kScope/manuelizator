const install = document.querySelector('#install-pwa');

if (install) {

    install.classList.toggle('hidden', true);

    document.addEventListener('beforeinstallprompt ', (e) => {
        e.preventDefault();
        window.deferredPrompt = e;
        install.classList.toggle('hidden', false);
    });

    window.addEventListener('appinstalled', (event) => {
        console.log('appinstalled', event);
        // Clear the deferredPrompt so it can be garbage collected
        window.deferredPrompt = null;
    });

    // Installs the pwa
    install.addEventListener('click', async (e) => {
        e.preventDefault();

        if (window.deferredPrompt) {
            window.deferredPrompt.prompt();
            const result = await window.deferredPrompt.userChoice;
            console.log('userChoice', result);
            window.deferredPrompt = null;

            install.classList.toggle('hidden', true);
        }
    });
}