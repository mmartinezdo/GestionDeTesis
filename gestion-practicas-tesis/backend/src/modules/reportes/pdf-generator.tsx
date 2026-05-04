// backend/src/modules/reportes/pdf-generator.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { renderToBuffer } from '@react-pdf/renderer';

// Usar fuentes estándar de PDF para evitar problemas de carga externa y corrupción
// o registrar una fuente local si es necesario.
// Roboto puede fallar si la URL no es accesible o el certificado falla.

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica', // Usar fuente estándar
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 120,
    fontSize: 10,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    fontSize: 10,
  },
  table: {
    marginTop: 10,
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3b82f6',
    padding: 5,
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  col1: { width: '20%' },
  col2: { width: '30%' },
  col3: { width: '25%' },
  col4: { width: '25%' },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
  },
});

export class PdfGenerator {
  static async generatePracticasReport(practicas: any[]) {
    const buffer = await renderToBuffer(
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Universidad Nacional de Trujillo</Text>
            <Text style={styles.subtitle}>Reporte de Prácticas Preprofesionales</Text>
            <Text style={styles.subtitle}>{`Fecha: ${new Date().toLocaleDateString('es-PE')}`}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumen General</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Total Prácticas:</Text>
              <Text style={styles.value}>{practicas.length.toString()}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detalle de Prácticas</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.col1}>Estudiante</Text>
                <Text style={styles.col2}>Empresa</Text>
                <Text style={styles.col3}>Estado</Text>
                <Text style={styles.col4}>Fecha Inicio</Text>
              </View>
              {practicas.map((p, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <Text style={styles.col1}>{`${p.estudiante.user.nombres} ${p.estudiante.user.apellidos}`}</Text>
                  <Text style={styles.col2}>{p.empresa.razonSocial}</Text>
                  <Text style={styles.col3}>{p.estado}</Text>
                  <Text style={styles.col4}>{new Date(p.fechaInicio).toLocaleDateString()}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.footer}>
            <Text>Sistema de Gestión de Prácticas y Tesis - UNT</Text>
            <Text>{`Reporte generado el ${new Date().toLocaleString('es-PE')}`}</Text>
          </View>
        </Page>
      </Document>
    );
    return buffer;
  }

  static async generateTesisReport(tesis: any[]) {
    const buffer = await renderToBuffer(
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Universidad Nacional de Trujillo</Text>
            <Text style={styles.subtitle}>Reporte de Tesis</Text>
            <Text style={styles.subtitle}>{`Fecha: ${new Date().toLocaleDateString('es-PE')}`}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Listado de Tesis</Text>
            {tesis.map((t, idx) => (
              <View key={idx} style={{ marginBottom: 15 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{`${idx + 1}. ${t.titulo}`}</Text>
                <Text style={{ fontSize: 9, marginTop: 3 }}>{`Estudiante: ${t.estudiante.user.nombres} ${t.estudiante.user.apellidos}`}</Text>
                <Text style={{ fontSize: 9 }}>{`Estado: ${t.estado}`}</Text>
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <Text>Sistema de Gestión de Prácticas y Tesis - UNT</Text>
            <Text>{`Reporte generado el ${new Date().toLocaleString('es-PE')}`}</Text>
          </View>
        </Page>
      </Document>
    );
    return buffer;
  }

  static async generateEstudiantesReport(estudiantes: any[]) {
    const buffer = await renderToBuffer(
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Universidad Nacional de Trujillo</Text>
            <Text style={styles.subtitle}>Reporte de Estudiantes</Text>
            <Text style={styles.subtitle}>{`Fecha: ${new Date().toLocaleDateString('es-PE')}`}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Listado General</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.col1}>Código</Text>
                <Text style={styles.col2}>Nombre Completo</Text>
                <Text style={styles.col3}>Escuela</Text>
                <Text style={styles.col4}>Actividad</Text>
              </View>
              {estudiantes.map((e, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <Text style={styles.col1}>{e.codigo}</Text>
                  <Text style={styles.col2}>{`${e.user.nombres} ${e.user.apellidos}`}</Text>
                  <Text style={styles.col3}>{e.escuela}</Text>
                  <Text style={styles.col4}>{`${e.practicas.length} Prác. / ${e.tesis.length} Tesis`}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.footer}>
            <Text>Sistema de Gestión de Prácticas y Tesis - UNT</Text>
            <Text>{`Reporte generado el ${new Date().toLocaleString('es-PE')}`}</Text>
          </View>
        </Page>
      </Document>
    );
    return buffer;
  }
}