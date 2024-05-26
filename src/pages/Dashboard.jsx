import React from 'react';
import { useState, useEffect } from "react"
import axios from "axios"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts"

const Dashboard = () => {
  const [Invoices, setInvoices] = useState([])
  const [selectedNumeroCliente, setSelectedNumeroCliente] = useState("")
  const [energyData, setEnergyData] = useState([])
  const [monetaryData, setMonetaryData] = useState([])
  const [clientNumbers, setClientNumbers] = useState([]);

  const baseUrl = "https://backend-lumi.vercel.app";

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/invoices`)
        setInvoices(response.data)
        const uniqueClientNumbers = [...new Set(response.data.map(invoice => invoice.numero_cliente))]
        setClientNumbers(uniqueClientNumbers)

        processChartData(response.data)
      } catch (error) {
        console.error("Error fetching Invoices:", error)
      }
    }
    fetchInvoices()
  }, [])

  const monthMapping = {
    "JAN": 1,
    "FEV": 2,
    "MAR": 3,
    "ABR": 4,
    "MAI": 5,
    "JUN": 6,
    "JUL": 7,
    "AGO": 8,
    "SET": 9,
    "OUT": 10,
    "NOV": 11,
    "DEZ": 12
  };

  useEffect(() => {
    const filteredInvoices = selectedNumeroCliente
      ? Invoices.filter(
        invoice => invoice.numero_cliente === selectedNumeroCliente
      )
      : Invoices
    processChartData(filteredInvoices)
  }, [selectedNumeroCliente, Invoices])

  const processChartData = Invoices => {
    if (!selectedNumeroCliente) {
      setEnergyData([{ name: "", Consumo: null, "Energia Compensada": null }])
      setMonetaryData([{ name: "", "Total sem GD": null, "Economia GD": null }])
      return
    }

    const energyChartData = Invoices
    .map(invoice => ({
      name: invoice.mes_referencia,
      Consumo:
        invoice.energia_eletrica_quantidade + invoice.energia_scee_quantidade,
      "Energia Compensada": invoice.energia_compensada_quantidade
    }))
    .sort((a, b) => {
      const [monthA, yearA] = a.name.split('/');
      const [monthB, yearB] = b.name.split('/');
      return yearA - yearB || monthMapping[monthA] - monthMapping[monthB];
    });

  const monetaryChartData = Invoices
    .map(invoice => ({
      name: invoice.mes_referencia,
      "Total sem GD": (
        invoice.energia_eletrica_valor +
        invoice.energia_scee_valor +
        invoice.contrib_ilum_publica
      ).toFixed(2),
      "Economia GD": invoice.energia_compensada_valor
    }))
    .sort((a, b) => {
      const [monthA, yearA] = a.name.split('/');
      const [monthB, yearB] = b.name.split('/');
      return yearA - yearB || monthMapping[monthA] - monthMapping[monthB];
    });

  setEnergyData(energyChartData);
  setMonetaryData(monetaryChartData);
  }

  return (
    <main className="w-screen flex">
      <section className="flex flex-col p-10 gap-10 justify-center items-center w-full">
        <h1>Dashboard</h1>
        <select
          value={selectedNumeroCliente}
          onChange={e => setSelectedNumeroCliente(e.target.value)}
          className="p-2 w-1/2 rounded border-2 border-gray-500"
        >
          <option value="">Selecione um número de cliente</option>
          {clientNumbers.map(clientNumber => (
            <option key={clientNumber} value={clientNumber}>
              {clientNumber}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-10">
          <div className="flex gap-5 text-center items-center justify-center">
            <div className="flex flex-col gap-3 text-center w-full items-center">
              <h2 className="text-xl font-bold">
                Consumo de Energia Elétrica (KWh)
              </h2>
              <LineChart
                width={800}
                height={500}
                data={energyData}
                data-testid="chart-data"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={16} fontWeight={600} />
                <YAxis fontSize={16} fontWeight={600} />
                <Tooltip />
                <Legend wrapperStyle={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', fontSize: '16px', margin: '0 0 0 32px', backgroundColor: '#FDFDFD', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <Line
                  type="monotone"
                  dataKey="Consumo"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="Energia Compensada"
                  stroke="#00dc77"
                />
              </LineChart>
            </div>
            <div className="flex flex-col gap-3 text-center w-full items-center">
              <h2 className="text-xl font-bold">Valores Monetários (R$)</h2>
              <LineChart
                width={800}
                height={500}
                data={monetaryData}
                data-testid="chart-data"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={16} fontWeight={600} />
                <YAxis fontSize={16} fontWeight={600} domain={[-1000, 2000]}/>
                <Tooltip />
                <Legend wrapperStyle={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', fontSize: '16px', margin: '0 0 0 32px', backgroundColor: '#FDFDFD', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <Line
                  type="monotone"
                  dataKey="Total sem GD"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="Economia GD" stroke="#00dc77" />
              </LineChart>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Dashboard
