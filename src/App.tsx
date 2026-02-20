import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { jsPDF } from 'jspdf'

type FormatType = '4x6' | 'a4' | 'letter'
type MarginMode = 'standard' | 'minimal'

type SenderProfile = {
  id: string
  name: string
  address1: string
  address2: string
  stateCountry: string
  phone: string
  isDefault?: boolean
}

type Recipient = {
  consignee: string
  attention: string
  address: string
  neighborhood: string
  city: string
  postalCode: string
  phone: string
}

type LabelSnapshot = {
  id: string
  createdAt: string
  sender: SenderProfile
  recipient: Recipient
  format: FormatType
  marginMode: MarginMode
  showCutGuides: boolean
}

type DraftSender = Omit<SenderProfile, 'id'>

type ValidationErrors = Partial<Record<keyof Recipient, string>>

const STORAGE_KEYS = {
  senders: 'gva_senders',
  recipientBook: 'gva_recipient_book',
  history: 'gva_history',
  prefs: 'gva_prefs'
}

const RECIPIENT_FIELDS: { key: keyof Recipient; label: string; requiredHint: string }[] = [
  { key: 'consignee', label: 'Consignatario', requiredHint: 'Te falta el nombre del consignatario.' },
  { key: 'attention', label: 'Atención', requiredHint: 'Te falta indicar a quién va dirigida.' },
  { key: 'address', label: 'Dirección', requiredHint: 'Te falta la dirección.' },
  { key: 'neighborhood', label: 'Colonia', requiredHint: 'Te falta la colonia.' },
  { key: 'city', label: 'Ciudad', requiredHint: 'Te falta la ciudad.' },
  { key: 'postalCode', label: 'C.P.', requiredHint: 'Te falta el C.P. para completar la etiqueta.' },
  { key: 'phone', label: 'Teléfono', requiredHint: 'Te falta el teléfono de contacto.' }
]

const EMPTY_RECIPIENT: Recipient = {
  consignee: '',
  attention: '',
  address: '',
  neighborhood: '',
  city: '',
  postalCode: '',
  phone: ''
}

const EMPTY_SENDER: DraftSender = {
  name: '',
  address1: '',
  address2: '',
  stateCountry: '',
  phone: '',
  isDefault: false
}

const DEFAULT_SENDER: SenderProfile = {
  id: crypto.randomUUID(),
  name: 'Granja Villa Alegre',
  address1: 'Camino a la Huerta 145',
  address2: 'Referencia: Portón verde',
  stateCountry: 'Chihuahua, Mex',
  phone: '614 000 0000',
  isDefault: true
}

const formatLabel: Record<FormatType, string> = {
  '4x6': '4x6 térmica',
  a4: 'A4',
  letter: 'Carta'
}

function App() {
  const [senders, setSenders] = useState<SenderProfile[]>([])
  const [selectedSenderId, setSelectedSenderId] = useState<string>('')
  const [format, setFormat] = useState<FormatType>('4x6')
  const [marginMode, setMarginMode] = useState<MarginMode>('standard')
  const [showCutGuides, setShowCutGuides] = useState(false)
  const [recipient, setRecipient] = useState<Recipient>(EMPTY_RECIPIENT)
  const [recipientBook, setRecipientBook] = useState<Recipient[]>([])
  const [history, setHistory] = useState<LabelSnapshot[]>([])
  const [generated, setGenerated] = useState<LabelSnapshot | null>(null)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [toast, setToast] = useState<string>('')

  const [showSenderDialog, setShowSenderDialog] = useState(false)
  const [editingSenderId, setEditingSenderId] = useState<string | null>(null)
  const [senderDraft, setSenderDraft] = useState<DraftSender>(EMPTY_SENDER)

  const fieldRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const selectedSender = useMemo(
    () => senders.find((sender) => sender.id === selectedSenderId) ?? senders[0] ?? null,
    [senders, selectedSenderId]
  )

  useEffect(() => {
    const rawSenders = localStorage.getItem(STORAGE_KEYS.senders)
    const rawRecipientBook = localStorage.getItem(STORAGE_KEYS.recipientBook)
    const rawHistory = localStorage.getItem(STORAGE_KEYS.history)
    const rawPrefs = localStorage.getItem(STORAGE_KEYS.prefs)

    const parsedSenders = rawSenders ? (JSON.parse(rawSenders) as SenderProfile[]) : []
    const senderList = parsedSenders.length ? parsedSenders : [DEFAULT_SENDER]

    setSenders(senderList)

    const prefs = rawPrefs
      ? (JSON.parse(rawPrefs) as { selectedSenderId?: string; format?: FormatType; marginMode?: MarginMode; showCutGuides?: boolean })
      : {}

    const firstDefault = senderList.find((sender) => sender.isDefault) ?? senderList[0]
    setSelectedSenderId(
      senderList.some((sender) => sender.id === prefs.selectedSenderId)
        ? (prefs.selectedSenderId as string)
        : firstDefault?.id ?? ''
    )

    if (prefs.format) setFormat(prefs.format)
    if (prefs.marginMode) setMarginMode(prefs.marginMode)
    if (typeof prefs.showCutGuides === 'boolean') setShowCutGuides(prefs.showCutGuides)

    if (rawRecipientBook) setRecipientBook(JSON.parse(rawRecipientBook) as Recipient[])
    if (rawHistory) setHistory((JSON.parse(rawHistory) as LabelSnapshot[]).slice(0, 20))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.senders, JSON.stringify(senders))
  }, [senders])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.recipientBook, JSON.stringify(recipientBook))
  }, [recipientBook])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history.slice(0, 20)))
  }, [history])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.prefs,
      JSON.stringify({
        selectedSenderId,
        format,
        marginMode,
        showCutGuides
      })
    )
  }, [selectedSenderId, format, marginMode, showCutGuides])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  function openCreateSender() {
    setEditingSenderId(null)
    setSenderDraft(EMPTY_SENDER)
    setShowSenderDialog(true)
  }

  function openEditSender() {
    if (!selectedSender) return
    const { id: _ignored, ...draft } = selectedSender
    setEditingSenderId(selectedSender.id)
    setSenderDraft(draft)
    setShowSenderDialog(true)
  }

  function saveSender(event: FormEvent) {
    event.preventDefault()

    if (!senderDraft.name.trim() || !senderDraft.address1.trim()) {
      setToast('Completa al menos nombre y dirección para guardar.')
      return
    }

    if (editingSenderId) {
      setSenders((current) =>
        current.map((sender) => (sender.id === editingSenderId ? { ...sender, ...senderDraft } : sender))
      )
      setToast('Guardado')
    } else {
      const newSender: SenderProfile = {
        id: crypto.randomUUID(),
        ...senderDraft,
        isDefault: senders.length === 0
      }
      setSenders((current) => [...current, newSender])
      setSelectedSenderId(newSender.id)
      setToast('Guardado')
    }

    setShowSenderDialog(false)
  }

  function duplicateSender() {
    if (!selectedSender) return
    const copy: SenderProfile = {
      ...selectedSender,
      id: crypto.randomUUID(),
      name: `${selectedSender.name} (copia)`,
      isDefault: false
    }
    setSenders((current) => [...current, copy])
    setSelectedSenderId(copy.id)
    setToast('Remitente duplicado')
  }

  function deleteSender() {
    if (!selectedSender) return
    if (senders.length === 1) {
      setToast('Necesitas al menos un remitente.')
      return
    }

    const allow = window.confirm(`¿Eliminar a ${selectedSender.name}? Puedes crear otro cuando quieras.`)
    if (!allow) return

    setSenders((current) => {
      const next = current.filter((sender) => sender.id !== selectedSender.id)
      if (!next.some((sender) => sender.isDefault)) {
        next[0] = { ...next[0], isDefault: true }
      }
      setSelectedSenderId(next[0]?.id ?? '')
      return next
    })
    setToast('Remitente eliminado')
  }

  function setDefaultSender() {
    if (!selectedSender) return
    setSenders((current) =>
      current.map((sender) => ({
        ...sender,
        isDefault: sender.id === selectedSender.id
      }))
    )
    setToast('Remitente predeterminado actualizado')
  }

  function validateRecipient(currentRecipient: Recipient): ValidationErrors {
    const nextErrors: ValidationErrors = {}

    for (const field of RECIPIENT_FIELDS) {
      if (!currentRecipient[field.key].trim()) {
        nextErrors[field.key] = field.requiredHint
      }
    }

    return nextErrors
  }

  function generateLabel() {
    if (!selectedSender) {
      setToast('Selecciona un remitente para continuar.')
      return
    }

    const nextErrors = validateRecipient(recipient)
    setErrors(nextErrors)

    const firstMissing = RECIPIENT_FIELDS.find((field) => nextErrors[field.key])
    if (firstMissing) {
      fieldRefs.current[firstMissing.key]?.focus()
      return
    }

    const snapshot: LabelSnapshot = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      sender: selectedSender,
      recipient: { ...recipient },
      format,
      marginMode,
      showCutGuides
    }

    setGenerated(snapshot)
    setHistory((current) => [snapshot, ...current.filter((item) => item.id !== snapshot.id)].slice(0, 20))
    setToast('Etiqueta lista')
  }

  function saveRecipientAsFrequent() {
    const nextErrors = validateRecipient(recipient)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      const firstMissing = RECIPIENT_FIELDS.find((field) => nextErrors[field.key])
      if (firstMissing) fieldRefs.current[firstMissing.key]?.focus()
      return
    }

    setRecipientBook((current) => {
      const deduped = current.filter(
        (item) => !(item.consignee.toLowerCase() === recipient.consignee.toLowerCase() && item.phone === recipient.phone)
      )
      return [recipient, ...deduped].slice(0, 30)
    })
    setToast('Guardado')
  }

  function fillFromFrequent(value: string) {
    if (!value) return
    const found = recipientBook.find((item) => `${item.consignee} - ${item.phone}` === value)
    if (!found) return
    setRecipient(found)
    setErrors({})
  }

  function repeatFromHistory(item: LabelSnapshot) {
    setSelectedSenderId(item.sender.id)
    setRecipient(item.recipient)
    setFormat(item.format)
    setMarginMode(item.marginMode)
    setShowCutGuides(item.showCutGuides)
    setGenerated(item)
    setErrors({})
    setToast('Etiqueta cargada desde historial')
  }

  function deleteHistoryItem(id: string) {
    setHistory((current) => current.filter((item) => item.id !== id))
    if (generated?.id === id) {
      setGenerated(null)
    }
    setToast('Etiqueta eliminada del historial')
  }

  function clearHistory() {
    if (history.length === 0) return
    const allow = window.confirm('¿Quieres borrar el historial de etiquetas?')
    if (!allow) return
    setHistory([])
    setToast('Historial borrado')
  }

  function printLabel() {
    if (!generated) return
    const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=900,height=900')
    if (!printWindow) {
      setToast('No se pudo abrir la vista de impresión.')
      return
    }

    const html = renderPrintHtml(generated)
    printWindow.document.write(html)
    printWindow.document.close()
    const triggerPrint = () => {
      printWindow.focus()
      printWindow.print()
    }

    // Run once content is ready; fallback covers browsers that do not fire onload reliably here.
    printWindow.onload = triggerPrint
    window.setTimeout(triggerPrint, 250)
  }

  function downloadPdf() {
    if (!generated) return

    const pdf = createPdfFromLabel(generated)
    const stamp = new Date(generated.createdAt).toISOString().slice(0, 19).replace(/:/g, '-')
    pdf.save(`etiqueta-${stamp}.pdf`)
  }

  const previewData = generated ?? (selectedSender ? {
    id: 'preview',
    createdAt: new Date().toISOString(),
    sender: selectedSender,
    recipient,
    format,
    marginMode,
    showCutGuides
  } : null)

  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
        <header className="rounded-2xl border border-app-border bg-app-surface p-6 shadow-soft">
          <h1 className="font-title text-2xl font-bold tracking-tight md:text-3xl">Granja Villa Alegre</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
            Selecciona el remitente y completa el destinatario. Genera, imprime y descarga sin perder el ritmo.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          <div className="space-y-6">
            <article className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-soft">
              <h2 className="font-title text-sm font-extrabold tracking-[0.18em] text-slate-700">REMITE</h2>

              <label className="mt-4 block text-sm font-semibold text-slate-700">Seleccionar remitente</label>
              <select
                value={selectedSenderId}
                onChange={(event) => setSelectedSenderId(event.target.value)}
                className="mt-2 w-full rounded-xl border border-app-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-app-primary focus:ring-2 focus:ring-blue-100"
              >
                {senders.map((sender) => (
                  <option key={sender.id} value={sender.id}>
                    {sender.name} {sender.isDefault ? '• Predeterminado' : ''}
                  </option>
                ))}
              </select>

              <div className="sender-actions mt-4">
                <button type="button" className="btn-secondary sender-action" onClick={openCreateSender}>Crear</button>
                <button type="button" className="btn-secondary sender-action" onClick={openEditSender} disabled={!selectedSender}>Editar</button>
                <button type="button" className="btn-secondary sender-action" onClick={duplicateSender} disabled={!selectedSender}>Duplicar</button>
                <button type="button" className="btn-secondary sender-action" onClick={deleteSender} disabled={!selectedSender}>Eliminar</button>
                <button type="button" className="btn-secondary sender-action sender-action-wide" onClick={setDefaultSender} disabled={!selectedSender}>Predeterminar</button>
              </div>

              {selectedSender && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <p className="font-semibold">{selectedSender.name}</p>
                  <p>{selectedSender.address1}</p>
                  {selectedSender.address2 && <p>{selectedSender.address2}</p>}
                  <p>{selectedSender.stateCountry}</p>
                  <p>{selectedSender.phone}</p>
                </div>
              )}
            </article>

            <article className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-soft">
              <h2 className="font-title text-sm font-extrabold tracking-[0.18em] text-slate-700">FORMATO</h2>
              <div className="mt-4 inline-flex w-full rounded-xl border border-app-border bg-slate-50 p-1 text-sm">
                {(['4x6', 'a4', 'letter'] as FormatType[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`format-chip ${format === option ? 'format-chip-active' : ''}`}
                    onClick={() => setFormat(option)}
                  >
                    {formatLabel[option]}
                  </button>
                ))}
              </div>

              {format === '4x6' ? (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-700">Márgenes</p>
                  <div className="mt-2 inline-flex rounded-xl border border-app-border bg-slate-50 p-1 text-sm">
                    <button
                      type="button"
                      onClick={() => setMarginMode('standard')}
                      className={`format-chip ${marginMode === 'standard' ? 'format-chip-active' : ''}`}
                    >
                      Estándar
                    </button>
                    <button
                      type="button"
                      onClick={() => setMarginMode('minimal')}
                      className={`format-chip ${marginMode === 'minimal' ? 'format-chip-active' : ''}`}
                    >
                      Mínimo
                    </button>
                  </div>
                </div>
              ) : (
                <label className="mt-4 flex items-center gap-3 rounded-xl border border-app-border bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={showCutGuides}
                    onChange={(event) => setShowCutGuides(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-app-primary focus:ring-app-primary"
                  />
                  Mostrar guías de corte (sutil)
                </label>
              )}
            </article>
          </div>

          <div className="space-y-6">
            <article className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-soft">
              <h2 className="font-title text-sm font-extrabold tracking-[0.18em] text-slate-700">CONSIGNATARIO</h2>

              <label className="mt-4 block text-sm font-semibold text-slate-700">Destinatarios frecuentes</label>
              <input
                list="recipient-book"
                placeholder="Busca por nombre y teléfono"
                onChange={(event) => fillFromFrequent(event.target.value)}
                className="mt-2 w-full rounded-xl border border-app-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-app-primary focus:ring-2 focus:ring-blue-100"
              />
              <datalist id="recipient-book">
                {recipientBook.map((item) => {
                  const value = `${item.consignee} - ${item.phone}`
                  return <option key={value} value={value} />
                })}
              </datalist>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {RECIPIENT_FIELDS.map((field) => (
                  <label key={field.key} className={field.key === 'address' ? 'md:col-span-2' : ''}>
                    <span className="text-sm font-semibold text-slate-700">{field.label}</span>
                    <input
                      ref={(el) => {
                        fieldRefs.current[field.key] = el
                      }}
                      value={recipient[field.key]}
                      onChange={(event) => {
                        setRecipient((current) => ({ ...current, [field.key]: event.target.value }))
                        if (errors[field.key]) {
                          setErrors((current) => ({ ...current, [field.key]: undefined }))
                        }
                      }}
                      className={`mt-1.5 w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-100 ${
                        errors[field.key] ? 'border-app-error focus:border-app-error' : 'border-app-border focus:border-app-primary'
                      }`}
                    />
                    {errors[field.key] && <p className="mt-1 text-xs text-app-error">{errors[field.key]}</p>}
                  </label>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className="btn-secondary" onClick={saveRecipientAsFrequent}>Guardar destinatario frecuente</button>
              </div>
            </article>

            <article className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-soft">
              <h2 className="font-title text-sm font-extrabold tracking-[0.18em] text-slate-700">ACCIONES</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" className="btn-primary" onClick={generateLabel}>Generar etiqueta</button>
                <button type="button" className="btn-secondary" onClick={printLabel} disabled={!generated}>Imprimir</button>
                <button type="button" className="btn-secondary" onClick={downloadPdf} disabled={!generated}>Descargar PDF</button>
              </div>
              {!generated && (
                <p className="mt-3 text-xs text-slate-500">Genera la etiqueta para habilitar impresión y PDF.</p>
              )}
              {generated && (
                <p className="mt-3 text-sm text-app-success">Etiqueta lista. Puedes imprimir o descargar en PDF.</p>
              )}
            </article>

            <article className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-soft">
              <h2 className="font-title text-sm font-extrabold tracking-[0.18em] text-slate-700">VISTA PREVIA</h2>
              <div className="mt-4 overflow-x-auto rounded-xl border border-app-border bg-[#eef2f7] p-4">
                {previewData ? <LabelPreview label={previewData} /> : <p className="text-sm text-slate-600">Selecciona un remitente para comenzar.</p>}
              </div>
            </article>

            <article className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-title text-sm font-extrabold tracking-[0.18em] text-slate-700">HISTORIAL</h2>
                <button type="button" className="btn-secondary" onClick={clearHistory} disabled={history.length === 0}>Borrar historial</button>
              </div>
              {history.length === 0 ? (
                <p className="mt-3 text-sm text-slate-600">Aún no hay etiquetas recientes.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {history.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                      <div className="text-sm">
                        <p className="font-semibold text-slate-800">{item.recipient.consignee}</p>
                        <p className="text-xs text-slate-600">{item.recipient.city} · {formatLabel[item.format]}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" className="btn-secondary" onClick={() => repeatFromHistory(item)}>Repetir</button>
                        <button type="button" className="btn-secondary" onClick={() => deleteHistoryItem(item.id)}>Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>
        </section>
      </main>

      {showSenderDialog && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/30 p-4">
          <form onSubmit={saveSender} className="w-full max-w-lg rounded-2xl border border-app-border bg-white p-5 shadow-xl">
            <h3 className="font-title text-lg font-bold">{editingSenderId ? 'Editar remitente' : 'Crear remitente'}</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Nombre</span>
                <input
                  value={senderDraft.name}
                  onChange={(event) => setSenderDraft((current) => ({ ...current, name: event.target.value }))}
                  className="mt-1.5 w-full rounded-xl border border-app-border px-3 py-2.5 text-sm outline-none transition focus:border-app-primary focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label className="md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Dirección (línea 1)</span>
                <input
                  value={senderDraft.address1}
                  onChange={(event) => setSenderDraft((current) => ({ ...current, address1: event.target.value }))}
                  className="mt-1.5 w-full rounded-xl border border-app-border px-3 py-2.5 text-sm outline-none transition focus:border-app-primary focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label className="md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Dirección (línea 2 / referencia)</span>
                <input
                  value={senderDraft.address2}
                  onChange={(event) => setSenderDraft((current) => ({ ...current, address2: event.target.value }))}
                  className="mt-1.5 w-full rounded-xl border border-app-border px-3 py-2.5 text-sm outline-none transition focus:border-app-primary focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label>
                <span className="text-sm font-semibold text-slate-700">Estado/País</span>
                <input
                  value={senderDraft.stateCountry}
                  onChange={(event) => setSenderDraft((current) => ({ ...current, stateCountry: event.target.value }))}
                  className="mt-1.5 w-full rounded-xl border border-app-border px-3 py-2.5 text-sm outline-none transition focus:border-app-primary focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label>
                <span className="text-sm font-semibold text-slate-700">Teléfono</span>
                <input
                  value={senderDraft.phone}
                  onChange={(event) => setSenderDraft((current) => ({ ...current, phone: event.target.value }))}
                  className="mt-1.5 w-full rounded-xl border border-app-border px-3 py-2.5 text-sm outline-none transition focus:border-app-primary focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button type="button" className="btn-secondary" onClick={() => setShowSenderDialog(false)}>Cancelar</button>
              <button type="submit" className="btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      )}

      {toast && (
        <div className="pointer-events-none fixed bottom-5 right-5 z-30 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}

function LabelPreview({ label }: { label: LabelSnapshot }) {
  const config = getPaperConfig(label.format)

  return (
    <div className="preview-wrap">
      <div
        key={`${label.format}-${label.marginMode}-${label.showCutGuides}`}
        className={`preview-canvas preview-canvas-${label.format}`}
        style={{ width: `${config.pageWidthIn}in`, height: `${config.pageHeightIn}in` }}
      >
        {label.format !== '4x6' && label.showCutGuides && (
          <div className="cut-guides" style={{ width: `${config.labelWidthIn}in`, height: `${config.labelHeightIn}in` }} />
        )}
        <div
          className={`label-sheet ${label.marginMode === 'minimal' ? 'label-sheet-minimal' : ''}`}
          style={{ width: `${config.labelWidthIn}in`, height: `${config.labelHeightIn}in` }}
        >
          <LabelContent label={label} compact={false} />
        </div>
      </div>
    </div>
  )
}

function LabelContent({ label, compact }: { label: LabelSnapshot; compact: boolean }) {
  const layout = getLabelLayout(label.format)

  return (
    <div className="h-full w-full text-[#0f172a]" style={{ padding: compact ? '1rem' : layout.padding }}>
      <section className="grid border-b border-slate-300 pb-2" style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: layout.gap }}>
        <div className="min-w-0">
          <p className="label-text-wrap font-extrabold tracking-[0.12em]" style={{ fontSize: layout.headerFont }}>REMITE</p>
          <p className="label-text-wrap mt-1 font-semibold" style={{ fontSize: layout.senderNameFont }}>{label.sender.name}</p>
          <p className="label-text-wrap" style={{ fontSize: layout.bodyFont }}>{label.sender.address1}</p>
          {label.sender.address2 && <p className="label-text-wrap" style={{ fontSize: layout.bodyFont }}>{label.sender.address2}</p>}
          <p className="label-text-wrap" style={{ fontSize: layout.bodyFont }}>{label.sender.stateCountry}</p>
          <p className="label-text-wrap" style={{ fontSize: layout.bodyFont }}>{label.sender.phone}</p>
        </div>
        <div className="min-w-0">
          <p className="label-text-wrap font-extrabold tracking-[0.12em]" style={{ fontSize: layout.headerFont }}>CONSIGNATARIO</p>
          <p className="label-text-wrap mt-1 font-bold leading-tight" style={{ fontSize: layout.consigneeFont }}>
            {label.recipient.consignee || 'Nombre del destinatario'}
          </p>
          <p className="label-text-wrap" style={{ fontSize: layout.bodyFont }}>Atención: {label.recipient.attention || '---'}</p>
          <p className="label-text-wrap mt-1 leading-snug" style={{ fontSize: layout.bodyFont }}>{label.recipient.address || 'Dirección completa'}</p>
          <p className="label-text-wrap" style={{ fontSize: layout.bodyFont }}>{label.recipient.neighborhood || 'Colonia'} · {label.recipient.city || 'Ciudad'}</p>
          <p className="label-text-wrap font-semibold" style={{ fontSize: layout.bodyFont }}>C.P. {label.recipient.postalCode || '-----'}</p>
          <p className="label-text-wrap" style={{ fontSize: layout.bodyFont }}>Tel. {label.recipient.phone || '-----'}</p>
        </div>
      </section>
      <div className="mt-2 flex items-center justify-between text-slate-600" style={{ fontSize: layout.footerFont }}>
        <p>{formatLabel[label.format]}</p>
        <p>{new Date(label.createdAt).toLocaleString('es-MX')}</p>
      </div>
    </div>
  )
}

function renderPrintHtml(label: LabelSnapshot) {
  const config = getPaperConfig(label.format)
  const layout = getLabelLayout(label.format)

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Etiqueta</title>
  <style>
    @page {
      size: ${config.pageWidthIn}in ${config.pageHeightIn}in;
      margin: 0;
    }

    body {
      margin: 0;
      font-family: "Source Sans 3", "Segoe UI", sans-serif;
      color: #0f172a;
    }

    .page {
      width: ${config.pageWidthIn}in;
      height: ${config.pageHeightIn}in;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .sheet {
      width: ${config.labelWidthIn}in;
      height: ${config.labelHeightIn}in;
      box-sizing: border-box;
      border: 1px solid #e2e8f0;
      padding: ${label.marginMode === 'minimal' ? '0.12in' : '0.22in'};
    }

    .guides {
      position: absolute;
      width: ${config.labelWidthIn}in;
      height: ${config.labelHeightIn}in;
      border: 1px dashed #94a3b8;
      opacity: 0.3;
      pointer-events: none;
    }

    .row { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: ${label.format === '4x6' ? '8px' : '12px'}; border-bottom: 1px solid #cbd5e1; padding-bottom: 10px; }
    .cell { min-width: 0; }
    .h { font-size: ${layout.headerFont}; font-weight: 800; letter-spacing: .12em; overflow-wrap: anywhere; }
    .n { margin-top: 4px; font-size: ${layout.consigneeFont}; font-weight: 700; line-height: 1.15; overflow-wrap: anywhere; }
    .t12 { font-size: ${layout.senderNameFont}; overflow-wrap: anywhere; }
    .t13 { font-size: ${layout.bodyFont}; overflow-wrap: anywhere; }
    .foot { margin-top: 8px; display: flex; justify-content: space-between; font-size: ${layout.footerFont}; color: #475569; }

    @media print { .print-btn { display: none; } }
  </style>
</head>
<body>
  <div class="page">
    ${label.format !== '4x6' && label.showCutGuides ? '<div class="guides"></div>' : ''}
    <div class="sheet">
      <div class="row">
        <div class="cell">
          <div class="h">REMITE</div>
          <div class="t12" style="margin-top: 4px; font-weight: 700;">${escapeHtml(label.sender.name)}</div>
          <div class="t12">${escapeHtml(label.sender.address1)}</div>
          ${label.sender.address2 ? `<div class="t12">${escapeHtml(label.sender.address2)}</div>` : ''}
          <div class="t12">${escapeHtml(label.sender.stateCountry)}</div>
          <div class="t12">${escapeHtml(label.sender.phone)}</div>
        </div>
        <div class="cell">
          <div class="h">CONSIGNATARIO</div>
          <div class="n">${escapeHtml(label.recipient.consignee || 'Nombre del destinatario')}</div>
          <div class="t12">Atención: ${escapeHtml(label.recipient.attention || '---')}</div>
          <div class="t13" style="margin-top: 4px;">${escapeHtml(label.recipient.address || 'Dirección completa')}</div>
          <div class="t13">${escapeHtml(label.recipient.neighborhood || 'Colonia')} · ${escapeHtml(label.recipient.city || 'Ciudad')}</div>
          <div class="t13" style="font-weight: 700;">C.P. ${escapeHtml(label.recipient.postalCode || '-----')}</div>
          <div class="t13">Tel. ${escapeHtml(label.recipient.phone || '-----')}</div>
        </div>
      </div>
      <div class="foot">
        <div>${escapeHtml(formatLabel[label.format])}</div>
        <div>${escapeHtml(new Date(label.createdAt).toLocaleString('es-MX'))}</div>
      </div>
    </div>
  </div>
</body>
</html>`
}

function createPdfFromLabel(label: LabelSnapshot) {
  if (label.format === '4x6') {
    const pdf = new jsPDF({ unit: 'in', format: [4, 6], orientation: 'portrait' })
    drawPdfLabel(pdf, label, { originX: 0, originY: 0, width: 4, height: 6, padding: label.marginMode === 'minimal' ? 0.12 : 0.22 }, 'in')
    return pdf
  }

  const formatName = label.format === 'a4' ? 'a4' : 'letter'
  const pdf = new jsPDF({ unit: 'mm', format: formatName, orientation: 'portrait' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const labelWidth = 101.6
  const labelHeight = 152.4
  const x = (pageWidth - labelWidth) / 2
  const y = (pageHeight - labelHeight) / 2
  drawPdfLabel(pdf, label, { originX: x, originY: y, width: labelWidth, height: labelHeight, padding: 5.5 }, 'mm')
  if (label.showCutGuides) {
    pdf.setDrawColor('#94a3b8')
    pdf.setLineDashPattern([1, 1], 0)
    pdf.rect(x, y, labelWidth, labelHeight)
    pdf.setLineDashPattern([], 0)
  }
  return pdf
}

function drawPdfLabel(
  pdf: jsPDF,
  label: LabelSnapshot,
  box: { originX: number; originY: number; width: number; height: number; padding: number },
  unit: 'in' | 'mm'
) {
  const layout = getPdfLayout(label.format, unit)
  pdf.setDrawColor('#e2e8f0')
  pdf.rect(box.originX, box.originY, box.width, box.height)

  const x = box.originX + box.padding
  const y = box.originY + box.padding
  const innerW = box.width - box.padding * 2

  const half = innerW / 2
  const columnGap = unit === 'in' ? 0.08 : 2
  const leftMaxWidth = half - columnGap
  const rightX = x + half + columnGap
  const rightMaxWidth = half - columnGap

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(layout.headerSize)
  pdf.text('REMITE', x, y)
  pdf.text('CONSIGNATARIO', rightX, y)

  let leftY = y + layout.firstLineOffset
  let rightY = leftY

  pdf.setFontSize(layout.senderNameSize)
  leftY = drawWrapped(pdf, label.sender.name, x, leftY, leftMaxWidth, layout.lineHeightSender)

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(layout.bodySize)
  const senderLines = [label.sender.address1, label.sender.address2, label.sender.stateCountry, label.sender.phone].filter(Boolean) as string[]
  senderLines.forEach((line) => {
    leftY = drawWrapped(pdf, line, x, leftY, leftMaxWidth, layout.lineHeightBody)
  })

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(layout.consigneeSize)
  rightY = drawWrapped(pdf, label.recipient.consignee, rightX, rightY, rightMaxWidth, layout.lineHeightConsignee)

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(layout.bodySize)
  const recipientLines = [
    `Atención: ${label.recipient.attention}`,
    label.recipient.address,
    `${label.recipient.neighborhood} · ${label.recipient.city}`,
    `C.P. ${label.recipient.postalCode}`,
    `Tel. ${label.recipient.phone}`
  ]

  recipientLines.forEach((line) => {
    rightY = drawWrapped(pdf, line, rightX, rightY, rightMaxWidth, layout.lineHeightBody)
  })
}

function drawWrapped(pdf: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const lines = pdf.splitTextToSize(text || ' ', maxWidth)
  pdf.text(lines, x, y)
  return y + lines.length * lineHeight
}

function getLabelLayout(format: FormatType) {
  if (format === '4x6') {
    return {
      padding: '0.16in',
      gap: '0.12in',
      headerFont: '9px',
      senderNameFont: '11px',
      consigneeFont: '15px',
      bodyFont: '11px',
      footerFont: '9px'
    }
  }

  return {
    padding: '0.24in',
    gap: '0.16in',
    headerFont: '10px',
    senderNameFont: '12px',
    consigneeFont: '17px',
    bodyFont: '12px',
    footerFont: '10px'
  }
}

function getPdfLayout(format: FormatType, unit: 'in' | 'mm') {
  const isInch = unit === 'in'
  const isThermal = format === '4x6'
  return {
    headerSize: isInch ? (isThermal ? 9 : 10) : (isThermal ? 7 : 8),
    senderNameSize: isInch ? (isThermal ? 10 : 11) : (isThermal ? 8 : 9),
    consigneeSize: isInch ? (isThermal ? 13 : 15) : (isThermal ? 10 : 12),
    bodySize: isInch ? (isThermal ? 8.8 : 9.4) : (isThermal ? 7.5 : 8),
    firstLineOffset: isInch ? 0.2 : 5,
    lineHeightSender: isInch ? (isThermal ? 0.14 : 0.16) : (isThermal ? 3.4 : 4),
    lineHeightConsignee: isInch ? (isThermal ? 0.14 : 0.16) : (isThermal ? 3.4 : 4),
    lineHeightBody: isInch ? (isThermal ? 0.12 : 0.13) : (isThermal ? 3 : 3.2)
  }
}

function getPaperConfig(format: FormatType) {
  if (format === '4x6') {
    return {
      pageWidthIn: 4,
      pageHeightIn: 6,
      labelWidthIn: 4,
      labelHeightIn: 6
    }
  }

  if (format === 'a4') {
    return {
      pageWidthIn: 8.27,
      pageHeightIn: 11.69,
      labelWidthIn: 4,
      labelHeightIn: 6
    }
  }

  return {
    pageWidthIn: 8.5,
    pageHeightIn: 11,
    labelWidthIn: 4,
    labelHeightIn: 6
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export default App
