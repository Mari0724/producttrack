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
        link: "https://docs.google.com/document/d/14g0Y1fbVgrVP8Un-6XVv6Tds8AnXLqzh/edit?usp=sharing&ouid=115095659559693426715&rtpof=true&sd=true"
      },
      {
        nombre: "DOFA",
        descripcion: "Análisis estratégico de fortalezas, oportunidades, debilidades y amenazas del proyecto.",
        link: "https://www.figma.com/board/tdpwIG42uSFENURMdXulou/DOFA_producttrack?t=xdYQ9Za5T6n8MohZ-1"
      }
    ]
  },
  {
    icono: "📋",
    titulo: "Requerimientos",
    items: [
      {
        nombre: "Jira - Gestión de Requerimientos",
        descripcion: "Gestión de requerimientos con manejo de sprints y tareas.",
        link: "https://ximenadelgadom07.atlassian.net/jira/software/projects/PRD/boards/7/timeline?atlOrigin=eyJpIjoiY2U1MTYwNTYwOGRmNDM0YzlmN2IxMzUzNWU2OTViNzciLCJwIjoiaiJ9"
      },
      {
        nombre: "Excel - Respaldo de Requerimientos",
        descripcion: "Archivo con requerimientos, costos y presupuestos. Alternativa si no se puede acceder a Jira, con unos extra.",
        link: "https://docs.google.com/spreadsheets/d/1QM0alTYjRtwsQlgaMctDk3PrSfbfVafa/edit?usp=sharing&ouid=115095659559693426715&rtpof=true&sd=true"
      },
      {
        nombre: "Especificación de Requerimientos (229 páginas)",
        descripcion: "Contiene historias de usuario, encuestas, cuadros, casos de uso y más.",
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
        link: "https://drive.google.com/file/d/1PBluhV_sOTRtlPAg1XUweIfqmOrYhv5D/view?usp=sharing"
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
        nombre: "Especificación de Requisitos del Sistema (link externo)",
        descripcion: "Documento formal de requisitos usado como base de desarrollo.",
        link: "https://docs.google.com/document/d/1zYcclS05ISGS_wHof4GGGy8nXrH7ooVJ/edit?usp=sharing&ouid=115095659559693426715&rtpof=true&sd=true"
      }
      ,
      {
        nombre: "Mokaps",
        descripcion: "Vistas preliminares del sistema diseñadas durante la etapa de prototipo.",
        link: "https://www.figma.com/design/QL9A3uCMo9Rwof7htdo0ap/Untitled?node-id=0-1&t=LH2mw4rgggmzu3ck-1"
      },
      {
        nombre: "Diagrama de Arquitectura del Sistema",
        descripcion: "Representación de alto nivel de la estructura del sistema, incluyendo tecnologías, componentes y relaciones entre frontend, backend, base de datos e IA.",
        link: "https://www.figma.com/design/hUdRfboJfdSL8p0yFIrR2Q/Untitled?t=nlnMBJ7vGIzZbKRO-1"
      },
      {
        nombre: "Diagramas UML y Técnicos",
        descripcion: "Casos de uso, clases, paquetes, actividades, ER, arquitectura, priorización, Moscow, secuencias.",
        link: "#"
      },
      {
        nombre: "Otros Diagramas Utiles",
        descripcion: "Casos de uso, clases, paquetes, actividades, ER, arquitectura, priorización, Moscow, secuencias.",
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
        link: "https://docs.google.com/document/d/1uEsQTgQBK7goIDXB5RHAfZX-gpKrRt8-/edit?usp=sharing&ouid=115095659559693426715&rtpof=true&sd=true"
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
        link: "https://app.eraser.io/workspace/zWHXs7QF3mRmevVx39uu?origin=share"
      }
    ]
  },
  {
    icono: "📄",
    titulo: "Documentación Técnica",
    items: [
      {
        nombre: "INFORME FINAL DE ESPECIFICACIONES Y DISEÑO DEL SISTEMA",
        descripcion: "Informe final con las especificaciones completas del sistema.",
        link: "https://docs.google.com/document/d/1L73wJfaZiF4e91UCTt3Z7WqbbhMicO7s/edit?usp=sharing&ouid=115095659559693426715&rtpof=true&sd=true"
      },
      {
        nombre: "Informe de Viabilidad del Proyecto",
        descripcion: "Análisis de factibilidad técnica, económica y operativa para ProductTrack.",
        link: "https://docs.google.com/document/d/1Wu_28kMRqilr2UuNSJmX3FdHy0Zhq9Xv/edit?usp=sharing&ouid=115095659559693426715&rtpof=true&sd=true"
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
        link: "https://docs.google.com/document/d/1jgOq5LeqeBr060I2i2Q-vqLqo3nWCTPm/edit?usp=sharing&ouid=115095659559693426715&rtpof=true&sd=true"
      },
      {
        nombre: "Contrato de Producto",
        descripcion: "Términos y condiciones del sistema acordados por el equipo.",
        link: "https://docs.google.com/document/d/1yzy8UVinsAP2LPAt2wSW_c5qo97vESAz/edit?usp=sharing&ouid=115095659559693426715&rtpof=true&sd=true"
      }
    ]
  },
  {
    icono: "✅",
    titulo: "Calidad y Validación",
    items: [
      {
        nombre: "Video 01 - Login funcional",
        descripcion: "Se muestra el requerimiento del login y su funcionamiento completo incluyendo validaciones.",
        link: "#"
      },
      {
        nombre: "Video 02 - Registro de productos",
        descripcion: "Se explica el requerimiento y se presenta el proceso de agregar un producto con éxito.",
        link: "#"
      },
      {
        nombre: "Video 03 - Alerta de vencimiento",
        descripcion: "Se valida el cumplimiento del requerimiento de alertas para productos próximos a vencer.",
        link: "#"
      },
      {
        nombre: "Video 04 - Visualización de inventario",
        descripcion: "Demostración de cómo los usuarios consultan el inventario según el requerimiento.",
        link: "#"
      },
      {
        nombre: "Control de Calidad - Evidencia cruzada",
        descripcion: "Archivo con evidencias cruzadas entre requerimientos y funcionalidades entregadas.",
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
        link: "https://drive.google.com/drive/folders/1vMBS-Qa2V8z1tgMNSiExXfY9lXokDNlY?usp=drive_link"
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
          <p className={styles.driveBackup}>
            También puedes consultar el <strong>respaldo completo</strong> en Google Drive, con la misma estructura de carpetas y documentos que aquí.
            <br />
            Enlace al Drive:{" "}
            <a href="https://drive.google.com/drive/folders/1Hz5cbS6UlFHtiUy2a8K7DgCmhx6jBbh8?usp=sharing" target="_blank" rel="noopener noreferrer">
              Abrir respaldo en Google Drive
            </a>
          </p>

        </div>
      </header>

      <main className={styles.grid}>
        {secciones.map((seccion, index) => (
          <div key={index} className={styles.card} onClick={() => expand(index)}>
            {isExpanded(index) && (
              <button
                className={styles.closeButton}
                onClick={(e) => {
                  e.stopPropagation();
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
