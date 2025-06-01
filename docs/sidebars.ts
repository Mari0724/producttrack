import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Backend',
      link: {
        type: 'doc',
        id: 'backend/index', // Este es el doc que se abre al hacer clic en 'Backend'
      },

      items: [
        //'backend/index',        // Asegúrate de tener docs/backend/index.md
        //'backend/arquitectura', // docs/backend/arquitectura.md
        //'backend/estructura',   // docs/backend/estructura.md
        //'backend/instalacion',  // docs/backend/instalacion.md
        //'backend/comandos',     // docs/backend/comandos.md
      ],
    },
    /*{
      type: 'category',
      label: 'Frontend',
      items: [
        'frontend/index',  // docs/frontend/index.md
      ],
    },
    {
      type: 'doc',
      id: 'instalacion',   // docs/instalacion.md
      label: 'Guía de instalación',
    },*/
  ],
};

export default sidebars;
