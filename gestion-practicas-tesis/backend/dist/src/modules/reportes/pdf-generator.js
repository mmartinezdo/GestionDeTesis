"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfGenerator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const renderer_1 = require("@react-pdf/renderer");
const renderer_2 = require("@react-pdf/renderer");
const styles = renderer_1.StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
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
class PdfGenerator {
    static async generatePracticasReport(practicas) {
        const buffer = await (0, renderer_2.renderToBuffer)((0, jsx_runtime_1.jsx)(renderer_1.Document, { children: (0, jsx_runtime_1.jsxs)(renderer_1.Page, { size: "A4", style: styles.page, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.header, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.title, children: "Universidad Nacional de Trujillo" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.subtitle, children: "Reporte de Pr\u00E1cticas Preprofesionales" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.subtitle, children: `Fecha: ${new Date().toLocaleDateString('es-PE')}` })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.section, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.sectionTitle, children: "Resumen General" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.row, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.label, children: "Total Pr\u00E1cticas:" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.value, children: practicas.length.toString() })] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.section, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.sectionTitle, children: "Detalle de Pr\u00E1cticas" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.table, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.tableHeader, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col1, children: "Estudiante" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col2, children: "Empresa" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col3, children: "Estado" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col4, children: "Fecha Inicio" })] }), practicas.map((p, idx) => ((0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.tableRow, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col1, children: `${p.estudiante.user.nombres} ${p.estudiante.user.apellidos}` }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col2, children: p.empresa.razonSocial }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col3, children: p.estado }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col4, children: new Date(p.fechaInicio).toLocaleDateString() })] }, idx)))] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.footer, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { children: "Sistema de Gesti\u00F3n de Pr\u00E1cticas y Tesis - UNT" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { children: `Reporte generado el ${new Date().toLocaleString('es-PE')}` })] })] }) }));
        return buffer;
    }
    static async generateTesisReport(tesis) {
        const buffer = await (0, renderer_2.renderToBuffer)((0, jsx_runtime_1.jsx)(renderer_1.Document, { children: (0, jsx_runtime_1.jsxs)(renderer_1.Page, { size: "A4", style: styles.page, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.header, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.title, children: "Universidad Nacional de Trujillo" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.subtitle, children: "Reporte de Tesis" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.subtitle, children: `Fecha: ${new Date().toLocaleDateString('es-PE')}` })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.section, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.sectionTitle, children: "Listado de Tesis" }), tesis.map((t, idx) => ((0, jsx_runtime_1.jsxs)(renderer_1.View, { style: { marginBottom: 15 }, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 11, fontWeight: 'bold' }, children: `${idx + 1}. ${t.titulo}` }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 9, marginTop: 3 }, children: `Estudiante: ${t.estudiante.user.nombres} ${t.estudiante.user.apellidos}` }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: { fontSize: 9 }, children: `Estado: ${t.estado}` })] }, idx)))] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.footer, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { children: "Sistema de Gesti\u00F3n de Pr\u00E1cticas y Tesis - UNT" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { children: `Reporte generado el ${new Date().toLocaleString('es-PE')}` })] })] }) }));
        return buffer;
    }
    static async generateEstudiantesReport(estudiantes) {
        const buffer = await (0, renderer_2.renderToBuffer)((0, jsx_runtime_1.jsx)(renderer_1.Document, { children: (0, jsx_runtime_1.jsxs)(renderer_1.Page, { size: "A4", style: styles.page, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.header, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.title, children: "Universidad Nacional de Trujillo" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.subtitle, children: "Reporte de Estudiantes" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.subtitle, children: `Fecha: ${new Date().toLocaleDateString('es-PE')}` })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.section, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.sectionTitle, children: "Listado General" }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.table, children: [(0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.tableHeader, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col1, children: "C\u00F3digo" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col2, children: "Nombre Completo" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col3, children: "Escuela" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col4, children: "Actividad" })] }), estudiantes.map((e, idx) => ((0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.tableRow, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col1, children: e.codigo }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col2, children: `${e.user.nombres} ${e.user.apellidos}` }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col3, children: e.escuela }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { style: styles.col4, children: `${e.practicas.length} Prác. / ${e.tesis.length} Tesis` })] }, idx)))] })] }), (0, jsx_runtime_1.jsxs)(renderer_1.View, { style: styles.footer, children: [(0, jsx_runtime_1.jsx)(renderer_1.Text, { children: "Sistema de Gesti\u00F3n de Pr\u00E1cticas y Tesis - UNT" }), (0, jsx_runtime_1.jsx)(renderer_1.Text, { children: `Reporte generado el ${new Date().toLocaleString('es-PE')}` })] })] }) }));
        return buffer;
    }
}
exports.PdfGenerator = PdfGenerator;
//# sourceMappingURL=pdf-generator.js.map