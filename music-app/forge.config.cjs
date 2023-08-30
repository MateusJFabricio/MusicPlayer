module.exports = {
    packagerConfig: {
      ignore: [
        /^\/src/,
        /(.eslintrc.json)|(.gitignore)|(electron.vite.config.ts)|(forge.config.cjs)|(tsconfig.*)/,
      ]
    },
    rebuildConfig: {},
    makers: [
      {
        name: '@electron-forge/maker-squirrel',
        config: {
          "authors": 'Mateus Fabricio',
          "description": 'Somente teste',
          "name": "TesteElectron",
          "category": "Test"
        },
      },
      {
        name: '@electron-forge/maker-zip',
        platforms: ['darwin'],
      },
      {
        name: '@electron-forge/maker-deb',
        config: {
          "authors": 'Mateus Fabricio',
          "description": 'Somente teste',
          "name": "TesteElectron",
          "category": "Test"
        },
      },
      {
        name: '@electron-forge/maker-rpm',
        config: {},
      },
    ],
  };
  