const {app, BrowserWindow, Menu, ipcMain, nativeTheme, dialog, nativeImage} = require('electron');
const path = require('path');

app.setAboutPanelOptions({
    applicationName: 'InfoGare Desktop',
    applicationVersion: app.getVersion(),
    copyright: '&copy; Absolument Oui',
    website: 'https://infogare.fr/'
});

function createWindow() {
    const main = new BrowserWindow({
        width: 800,
        height: 800
    });

    main.loadFile(path.join(__dirname, 'html/index.htm'));

    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
          nativeTheme.themeSource = 'light'
        } else {
          nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    });
    
    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    });

    app.addRecentDocument(path.join(__dirname, 'icon.png'));

    const menu_template = [
        // {role: 'fileMenu'},
        {
            label: 'Fichier',
            submenu: [
                {
                    label: 'A propos...',
                    click: () => {
                        dialog.showMessageBox(main, {
                            icon: nativeImage.createFromPath(path.join(__dirname, 'icon.png'), (32, 32)),
                            title: 'A propos...',
                            message: 'InfoGare Desktop',
                            details: 'Version '+app.getVersion()
                        });
                    }
                },
                { type: 'separator' },
                {
                    label: 'Quitter',
                    click: () => {
                        main.close();
                    }
                }
            ]
        },
        {
            label: 'Gares',
            submenu: [
                {
                    label: 'Créer une gare',
                    click: () => {
                        dialog.showErrorBox('Pas dev !', 'Cette fonctionnalité n\'est pas encore développée !');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Mes gares',
                    role: 'recentdocuments'
                }
            ]
        }
    ]


    const main_menu = Menu.buildFromTemplate(menu_template);
    main.setMenu(main_menu);
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
})