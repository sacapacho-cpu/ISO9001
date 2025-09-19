
"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Users,
  Target,
  Settings,
} from "lucide-react";


type Process = {
  id: string;
  name: string;
  isoRequirements: string[];
  compliance: number;
  status: 'critical' | 'low' | 'medium' | 'good' | 'excellent';
  description: string;
  hasDocuments: string[];
  missing: string[];
  gaps: string[];
  interactions: string[];
};

type LayerType = 'strategic' | 'operational' | 'support';

const ProcessMap: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [filterLevel, setFilterLevel] = useState<LayerType | 'all'>('all');

  const processData: Record<LayerType, {
    title: string;
    color: string;
    processes: Process[];
  }> = {
    strategic: {
      title: "PROCESOS ESTRATÉGICOS",
      color: "from-red-500 to-red-600",
      processes: [
        {
          id: 'direccionamiento',
          name: 'Direccionamiento Estratégico',
          isoRequirements: ['4.1', '4.2', '5.1', '5.2'],
          compliance: 25,
          status: 'critical',
          description: 'Definición de contexto organizacional y liderazgo estratégico',
          hasDocuments: ['Plan Estratégico 2017-2019', 'Manual de Calidad (parcial)'],
          missing: ['Matriz de partes interesadas', 'Política de calidad aprobada', 'Objetivos de calidad'],
          gaps: [
            'Identificación incompleta de partes interesadas',
            'Falta seguimiento estructurado a stakeholders',
            'Política de calidad sin aprobación formal'
          ],
          interactions: ['all_operational', 'all_support']
        },
        {
          id: 'planificacion',
          name: 'Planificación del SGC',
          isoRequirements: ['6.1', '6.2', '6.3'],
          compliance: 23,
          status: 'critical',
          description: 'Gestión de riesgos, oportunidades y objetivos de calidad',
          hasDocuments: ['SARC', 'SARLATF', 'Plan Estratégico'],
          missing: ['Objetivos SMART de calidad', 'Procedimiento control cambios'],
          gaps: [
            'Ausencia total de objetivos de calidad',
            'Sin planificación sistemática de cambios',
            'Metodología de riesgos incompleta'
          ],
          interactions: ['gestion_riesgos', 'mejora_continua']
        }
      ]
    },
    operational: {
      title: "PROCESOS MISIONALES - COOPERATIVOS",
      color: "from-green-500 to-green-600",
      processes: [
        {
          id: 'ahorro_credito',
          name: 'Servicios de Ahorro y Crédito',
          isoRequirements: ['8.1', '8.2', '8.5'],
          compliance: 83,
          status: 'good',
          description: 'Productos financieros principales de la cooperativa',
          hasDocuments: ['Caracterizaciones de procesos', 'Manual de operaciones'],
          missing: ['Documentación servicios digitales'],
          gaps: [
            'Documentación parcial de requisitos digitales',
            'Mejora en trazabilidad de servicios'
          ],
          interactions: ['atencion_cliente', 'gestion_riesgos', 'tecnologia']
        },
        {
          id: 'atencion_cliente',
          name: 'Atención al Asociado',
          isoRequirements: ['8.2', '9.1.2'],
          compliance: 17,
          status: 'critical',
          description: 'Gestión de la relación y satisfacción del cliente',
          hasDocuments: ['Sistema PQRS', 'Herramienta no conformes'],
          missing: ['Sistema medición satisfacción', 'Encuestas estructuradas'],
          gaps: [
            'Sin medición sistemática de satisfacción',
            'Falta comprensión integral requisitos cliente',
            'Seguimiento deficiente a quejas y reclamos'
          ],
          interactions: ['ahorro_credito', 'mejora_continua']
        },
        {
          id: 'desarrollo_productos',
          name: 'Diseño y Desarrollo de Servicios',
          isoRequirements: ['8.3'],
          compliance: 100,
          status: 'excellent',
          description: 'Innovación y mejora de productos cooperativos',
          hasDocuments: ['Sistema Aseguramiento Calidad', 'Proceso innovación'],
          missing: ['Metodología diseño centrado en usuario'],
          gaps: [
            'Mejora en gestión de cambios de diseño'
          ],
          interactions: ['ahorro_credito', 'tecnologia']
        }
      ]
    },
    support: {
      title: "PROCESOS DE APOYO",
      color: "from-orange-500 to-orange-600",
      processes: [
        {
          id: 'talento_humano',
          name: 'Gestión del Talento Humano',
          isoRequirements: ['7.1.2', '7.2', '7.3'],
          compliance: 67,
          status: 'medium',
          description: 'Administración del personal y competencias',
          hasDocuments: ['Manual Funciones y Competencias', 'Evaluaciones desempeño'],
          missing: ['Programa sensibilización SGC', 'Plan capacitación calidad'],
          gaps: [
            'Falta toma de conciencia sobre SGC',
            'Programa de capacitación incompleto'
          ],
          interactions: ['direccionamiento', 'mejora_continua']
        },
        {
          id: 'tecnologia',
          name: 'Gestión Tecnológica',
          isoRequirements: ['7.1.3', '7.5'],
          compliance: 50,
          status: 'medium',
          description: 'Infraestructura tecnológica y sistemas de información',
          hasDocuments: ['WorkManager', 'Sistema SAIA'],
          missing: ['Plan integral TI', 'Seguridad información'],
          gaps: [
            'Infraestructura parcialmente documentada',
            'Control mejorado de documentos digitales'
          ],
          interactions: ['ahorro_credito', 'atencion_cliente']
        },
        {
          id: 'gestion_riesgos',
          name: 'Gestión de Riesgos',
          isoRequirements: ['6.1', '8.4'],
          compliance: 63,
          status: 'medium',
          description: 'Identificación y tratamiento de riesgos operacionales',
          hasDocuments: ['SARC', 'SARLATF', 'Manual riesgos crediticios'],
          missing: ['Matriz integral riesgos SGC', 'Metodología oportunidades'],
          gaps: [
            'Integración riesgos operacionales y SGC',
            'Evaluación sistemática proveedores'
          ],
          interactions: ['ahorro_credito', 'planificacion']
        },
        {
          id: 'auditoria_control',
          name: 'Auditoría y Control Interno',
          isoRequirements: ['9.2', '9.3'],
          compliance: 53,
          status: 'medium',
          description: 'Supervisión y control del sistema de gestión',
          hasDocuments: ['Sistema Control Interno', 'Informes auditoría'],
          missing: ['Programa auditorías calidad', 'Plan revisión dirección'],
          gaps: [
            'Sin programa formal auditorías internas SGC',
            'Revisión sistemática por dirección deficiente'
          ],
          interactions: ['direccionamiento', 'mejora_continua']
        },
        {
          id: 'mejora_continua',
          name: 'Mejoramiento Continuo',
          isoRequirements: ['10.1', '10.2', '10.3'],
          compliance: 80,
          status: 'good',
          description: 'Gestión de no conformidades y mejoras',
          hasDocuments: ['Planes mejoramiento', 'Proceso evaluación y mejora'],
          missing: ['Análisis tendencias', 'Indicadores eficacia'],
          gaps: [
            'Revisión eficacia acciones correctivas',
            'Análisis sistemático tendencias'
          ],
          interactions: ['atencion_cliente', 'auditoria_control']
        }
      ]
    }
  };

  const getStatusColor = (status: Process['status']) => {
    const colors: Record<Process['status'], string> = {
      critical: 'text-red-600 bg-red-100 border-red-200',
      low: 'text-orange-600 bg-orange-100 border-orange-200',
      medium: 'text-yellow-600 bg-yellow-100 border-yellow-200',
      good: 'text-green-600 bg-green-100 border-green-200',
      excellent: 'text-emerald-600 bg-emerald-100 border-emerald-200',
    };
    return colors[status] || colors.medium;
  };

  const getStatusIcon = (status: Process['status']) => {
    switch (status) {
      case 'critical':
        return <XCircle className="w-4 h-4" />;
      case 'excellent':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const ProcessCard: React.FC<{ process: Process; layerType: string }> = ({ process }) => (
    <div
      className={`bg-white rounded-lg shadow-lg border-2 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        selectedProcess?.id === process.id
          ? 'border-blue-500 ring-2 ring-blue-200'
          : 'border-gray-200'
      }`}
      onClick={() => setSelectedProcess(process)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800 text-sm">{process.name}</h3>
          <div className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(process.status)}`}>
            {getStatusIcon(process.status)}
            {process.compliance}%
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-3">{process.description}</p>

        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-1">Requisitos ISO:</div>
          <div className="flex flex-wrap gap-1">
            {process.isoRequirements.map((req) => (
              <span key={req} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {req}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              process.status === 'critical'
                ? 'bg-red-500'
                : process.status === 'low'
                ? 'bg-orange-500'
                : process.status === 'medium'
                ? 'bg-yellow-500'
                : process.status === 'good'
                ? 'bg-green-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${process.compliance}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  const ProcessDetails: React.FC<{ process: Process }> = ({ process }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{process.name}</h2>
        <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusColor(process.status)}`}>
          {getStatusIcon(process.status)}
          <span className="font-semibold">{process.compliance}%</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Descripción
          </h3>
          <p className="text-gray-600 text-sm">{process.description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Requisitos ISO Relacionados</h3>
          <div className="flex flex-wrap gap-2">
            {process.isoRequirements.map((req) => (
              <span key={req} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                ISO 9001:{req}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Brechas Identificadas
          </h3>
          <ul className="space-y-1">
            {process.gaps.map((gap, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                {gap}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Documentos Existentes
          </h3>
          <ul className="space-y-1">
            {process.hasDocuments.map((doc, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                {doc}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-orange-600 mb-2 flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Elementos Faltantes
          </h3>
          <ul className="space-y-1">
            {process.missing.map((item, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const filteredData =
    filterLevel === 'all'
      ? processData
      : { [filterLevel]: processData[filterLevel] };

  const overallCompliance = Math.round(
    Object.values(processData).reduce(
      (acc, layer) => acc + layer.processes.reduce((sum, p) => sum + p.compliance, 0),
      0
    ) /
      Object.values(processData).reduce((acc, layer) => acc + layer.processes.length, 0)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Mapa de Procesos ISO 9001:2015
          </h1>
          <p className="text-gray-600 mb-4">Kairo SAS - Sistema de Gestión de Calidad</p>
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-700">Cumplimiento General: {overallCompliance}%</span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Vista:</label>
              <select
                className="border rounded px-3 py-1 text-sm"
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value as LayerType | 'all')}
              >
                <option value="all">Todos los procesos</option>
                <option value="strategic">Estratégicos</option>
                <option value="operational">Operacionales</option>
                <option value="support">Apoyo</option>
              </select>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Crítico</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Medio</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Bueno</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                <span>Excelente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Process Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(filteredData).map(([key, layer]) => (
              <div key={key} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-r ${layer.color} text-white p-4`}>
                  <h2 className="text-lg font-bold text-center">{layer.title}</h2>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {layer.processes.map((process) => (
                      <ProcessCard key={process.id} process={process} layerType={key} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {selectedProcess ? (
                <ProcessDetails process={selectedProcess} />
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Selecciona un Proceso
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Haz clic en cualquier proceso para ver detalles sobre su cumplimiento,
                    brechas identificadas y documentación.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-red-100 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-sm text-red-700">Procesos Críticos</div>
          </div>
          <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">4</div>
            <div className="text-sm text-yellow-700">Cumplimiento Medio</div>
          </div>
          <div className="bg-green-100 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">2</div>
            <div className="text-sm text-green-700">Buen Cumplimiento</div>
          </div>
          <div className="bg-emerald-100 border border-emerald-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">1</div>
            <div className="text-sm text-emerald-700">Cumplimiento Excelente</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return <ProcessMap />;
}
