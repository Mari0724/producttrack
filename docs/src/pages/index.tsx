import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

interface Documento {
  nombre: string;
  descripcion: string;
  link: string;
}

interface Seccion {
  icono: string;
  titulo: string;
  items: Documento[];
}

const secciones: Seccion[] = [
  {
    icono: "🧠",
    titulo: "Investigación y Desarrollo",
    items: [
      {
        nombre: "IDI - Investigación, desarrollo e innovación",
        descripcion: "Documento base con la justificación inicial del proyecto y enfoque innovador.",
        link: "#"
      },
      {
        nombre: "DOFA",
        descripcion: "Análisis estratégico de fortalezas, oportunidades, debilidades y amenazas del proyecto.",
        link: "#"
      }
    ]
  },
  {
    icono: "📐",
    titulo: "Análisis y Diseño",
    items: [
      {
        nombre: "Propuesta Técnica",
        descripcion: "Documento técnico con objetivos, herramientas, etapas y estrategias del proyecto.",
        link: "#"
      },
      {
        nombre: "Manual Técnico",
        descripcion: "Documento con casos de uso extendidos y modelo entidad-relación inicial.",
        link: "#"
      },
      {
        nombre: "Proyecto - Requisitos del Sistema",
        descripcion: "Plantilla enfocada en definir el producto a desarrollar.",
        link: "#"
      },
      {
        nombre: "Mokaps",
        descripcion: "Vistas preliminares del sistema diseñadas durante la etapa de prototipo.",
        link: "#"
      },
      {
        nombre: "Diagramas UML y Técnicos",
        descripcion: "Casos de uso, clases, paquetes, actividades, ER, arquitectura, priorización, Moscow, secuencias.",
        link: "#"
      }
    ]
  },
  {
    icono: "📋",
    titulo: "Requerimientos",
    items: [
      {
        nombre: "Jira + Excel",
        descripcion: "Gestión de requerimientos: Jira con manejo de sprints, y Excel con costos, cronograma y prioridades.",
        link: "#"
      },
      {
        nombre: "Especificación de Requerimientos (229 páginas)",
        descripcion: "Contiene historias de usuario, encuestas, cuadros, casos de uso y más.",
        link: "#"
      }
    ]
  },
  {
    icono: "🧱",
    titulo: "Planeación y Gestión",
    items: [
      {
        nombre: "Bitácora de Sprints",
        descripcion: "Registro del trabajo realizado semana a semana.",
        link: "#"
      }
    ]
  },
  {
    icono: "🖥️",
    titulo: "Desarrollo",
    items: [
      {
        nombre: "Decisiones Arquitectónicas",
        descripcion: "Justificación de tecnologías, estructura del sistema y componentes técnicos.",
        link: "#"
      },
      {
        nombre: "Diagrama Eraser (BD actual)",
        descripcion: "Modelo actualizado de base de datos con tablas, campos y relaciones.",
        link: "#"
      }
    ]
  },
  {
    icono: "📄",
    titulo: "Documentación Técnica",
    items: [
      {
        nombre: "INFORME_FINAL DE ESPECIFICACIONES Y DISEÑO DEL SISTEMA__004",
        descripcion: "Informe final con las especificaciones completas del sistema.",
        link: "#"
      }
    ]
  },
  {
    icono: "📑",
    titulo: "Contratos y Legales",
    items: [
      {
        nombre: "Contrato de Persona",
        descripcion: "Responsabilidades individuales dentro del equipo.",
        link: "#"
      },
      {
        nombre: "Contrato de Producto",
        descripcion: "Términos y condiciones del sistema acordados por el equipo.",
        link: "#"
      }
    ]
  },
  {
    icono: "🗃️",
    titulo: "Documentación Antigua",
    items: [
      {
        nombre: "Versiones anteriores de documentos",
        descripcion: "Archivos antiguos usados como referencia, ya no vigentes.",
        link: "#"
      }
    ]
  }
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const expand = (index: number) => {
    if (!expandedSections.includes(index)) {
      setExpandedSections([...expandedSections, index]);
    }
  };

  const close = (index: number) => {
    setExpandedSections(expandedSections.filter((i) => i !== index));
  };

  const isExpanded = (index: number) => expandedSections.includes(index);

  return (
    <Layout title="Inicio" description="Documentación general del proyecto ProductTrack">
      <header className={styles.heroBanner}>
        <div className="container">
          <h1 className={styles.title}>{siteConfig.title}</h1>
          <p className={styles.subtitle}>Gestión integral de inventarios</p>
        </div>
      </header>

      <main className={styles.grid}>
        {secciones.map((seccion, index) => (
          <div key={index} className={styles.card} onClick={() => expand(index)}>
            {isExpanded(index) && (
              <button
                className={styles.closeButton}
                onClick={(e) => {
                  e.stopPropagation(); // evita que se dispare el expand al cerrar
                  close(index);
                }}
                aria-label="Cerrar sección"
              >
                ❌
              </button>
            )}

            <div className={styles.cardHeader}>
              <span className={styles.icon}>{seccion.icono}</span>
              <h2>{seccion.titulo}</h2>
            </div>

            {isExpanded(index) && (
              <ul className={styles.documentList}>
                {seccion.items.map((doc, i) => (
                  <li key={i} className={styles.documentItem}>
                    <strong>{doc.nombre}</strong>: {doc.descripcion}
                    <br />
                    <a href={doc.link} target="_blank" rel="noopener noreferrer">
                      (Enlace pendiente)
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </main>
    </Layout>
  );
}
