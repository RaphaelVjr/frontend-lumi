import React, { useState, useEffect } from "react"
import axios from "axios"
import { Table } from "antd"
import { motion } from "framer-motion"

const Library = () => {
  const [invoices, setInvoices] = useState([])

  const baseUrl = "https://backend-lumi.vercel.app";

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${baseUrl}/invoices`)
      setInvoices(response.data)
    } catch (error) {
      console.error("Error fetching Invoices:", error)
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  const searchInvoices = async numeroCliente => {
    if (numeroCliente) {
      try {
        const response = await axios.get(
          `${baseUrl}invoices/cliente/${numeroCliente}`
        )
        setInvoices(response.data)
      } catch (error) {
        console.error(error)
      }
    } else {
      fetchInvoices()
    }
  }

  const columns = [
    {
      title: "Número do Cliente",
      dataIndex: "numero_cliente",
      key: "numero_cliente"
    },
    {
      title: "Mês de Referência",
      dataIndex: "mes_referencia",
      key: "mes_referencia"
    },
    {
      title: "Download",
      key: "download",
      render: (_, record) => (
        <motion.a
          className="bg-[#0dad62] text-[#12312a] rounded p-2 hover:text-white justify-center align-middle"
          href={`https://backend-lumi.vercel.app/invoices/download/${record.id}`}
          download
        >
          Download
        </motion.a>
      )
    }
  ]

  const paginationConfig = {
    pageSize: 5,
    showSizeChanger: false
  }

  return (
    <main className="w-screen flex">
      <section className="flex flex-col gap-10 p-10 justify-center items-center w-full">
        <h1 className="text-[#12312a] font-sans font-semibold">Invoices</h1>
        <input
          type="text"
          placeholder="Pesquise pelo número do cliente"
          onChange={e => searchInvoices(e.target.value)}
          className="p-2 w-1/2 rounded border-2 border-gray-400"
        />
        <Table
          className="w-full"
          dataSource={invoices}
          columns={columns}
          pagination={paginationConfig}
        />
      </section>
    </main>
  )
}

export default Library
