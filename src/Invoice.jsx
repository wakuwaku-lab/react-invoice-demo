import { useState } from 'react'

function Invoice() {
  const [formData, setFormData] = useState({
    companyName: '株式会社□□□□□',
    companyAddress: '東京都千代田区△△町1-2-3',
    companyTel: '03-1234-5678',
    companyFax: '03-1234-5679',
    customerName: '〇〇〇〇株式会社',
    customerAddress: '東京都港区○○町4-5-6',
    invoiceNumber: '2024-001',
    invoiceDate: '2024年1月15日',
    dueDate: '2024年2月15日',
    subject: 'ウェブサイト制作費用',
    items: [
      { id: 1, content: 'ウェブサイト制作費', quantity: 1, unitPrice: 500000, note: 'デザイン・実装・公開まで' },
      { id: 2, content: '', quantity: '', unitPrice: '', note: '' },
      { id: 3, content: '', quantity: '', unitPrice: '', note: '' },
      { id: 4, content: '', quantity: '', unitPrice: '', note: '' },
      { id: 5, content: '', quantity: '', unitPrice: '', note: '' },
    ],
    bankInfo: '△△銀行 △△支行 普通 1234567',
    taxRate: 10,
  })

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0
      const price = parseFloat(item.unitPrice) || 0
      return sum + (qty * price)
    }, 0)
  }

  const calculateTax = () => {
    return Math.floor(calculateSubtotal() * (formData.taxRate / 100))
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleItemChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }))
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const subtotal = calculateSubtotal()
  const tax = calculateTax()
  const total = calculateTotal()

  return (
    <div className="invoice-container">
      <div className="invoice-paper">
        <div className="invoice-header">
          <div className="invoice-title">
            <h1>御 請 求 書</h1>
          </div>
          <div className="invoice-info">
            <div className="info-row">
              <span className="label">件名：</span>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                className="input-field"
              />
            </div>
            <div className="info-row">
              <span className="label">支払期限：</span>
              <input
                type="text"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                className="input-field"
              />
            </div>
            <div className="info-row">
              <span className="label">振込先：</span>
              <input
                type="text"
                value={formData.bankInfo}
                onChange={(e) => handleChange('bankInfo', e.target.value)}
                className="input-field bank-input"
              />
            </div>
          </div>
        </div>

        <div className="parties">
          <div className="from-section">
            <div className="section-label">差出人</div>
            <div className="company-info">
              <div className="company-name">
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="input-field company-name-input"
                />
              </div>
              <div className="company-details">
                <span>〒</span>
                <input
                  type="text"
                  value={formData.companyAddress}
                  onChange={(e) => handleChange('companyAddress', e.target.value)}
                  className="input-field address-input"
                />
              </div>
              <div className="company-contact">
                <span>TEL：</span>
                <input
                  type="text"
                  value={formData.companyTel}
                  onChange={(e) => handleChange('companyTel', e.target.value)}
                  className="input-field"
                />
                <span className="fax-label">FAX：</span>
                <input
                  type="text"
                  value={formData.companyFax}
                  onChange={(e) => handleChange('companyFax', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="to-section">
            <div className="section-label">御中</div>
            <div className="customer-info">
              <div className="customer-name">
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => handleChange('customerName', e.target.value)}
                  className="input-field customer-name-input"
                />
              </div>
              <div className="customer-details">
                <span>〒</span>
                <input
                  type="text"
                  value={formData.customerAddress}
                  onChange={(e) => handleChange('customerAddress', e.target.value)}
                  className="input-field address-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="invoice-intro">
          下記の通り、御請求申し上げます。
        </div>

        <div className="invoice-meta">
          <div className="meta-row">
            <span>請求書番号：</span>
            <input
              type="text"
              value={formData.invoiceNumber}
              onChange={(e) => handleChange('invoiceNumber', e.target.value)}
              className="input-field"
            />
          </div>
          <div className="meta-row">
            <span>請求日：</span>
            <input
              type="text"
              value={formData.invoiceDate}
              onChange={(e) => handleChange('invoiceDate', e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <table className="items-table">
          <thead>
            <tr>
              <th className="col-content">内　容</th>
              <th className="col-quantity">数量</th>
              <th className="col-unit-price">単価</th>
              <th className="col-amount">金額</th>
              <th className="col-note">備　考</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, index) => (
              <tr key={item.id}>
                <td className="col-content">
                  <input
                    type="text"
                    value={item.content}
                    onChange={(e) => handleItemChange(item.id, 'content', e.target.value)}
                    className="input-field table-input"
                  />
                </td>
                <td className="col-quantity">
                  <input
                    type="text"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                    className="input-field table-input right"
                  />
                </td>
                <td className="col-unit-price">
                  <input
                    type="text"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                    className="input-field table-input right"
                  />
                </td>
                <td className="col-amount right">
                  {item.quantity && item.unitPrice
                    ? formatCurrency(parseFloat(item.quantity) * parseFloat(item.unitPrice))
                    : '¥0'}
                </td>
                <td className="col-note">
                  <input
                    type="text"
                    value={item.note}
                    onChange={(e) => handleItemChange(item.id, 'note', e.target.value)}
                    className="input-field table-input"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="totals-section">
          <div className="total-row">
            <span className="total-label">小計</span>
            <span className="total-value">{formatCurrency(subtotal)}</span>
          </div>
          <div className="total-row">
            <span className="total-label">消費税 ({formData.taxRate}%)</span>
            <span className="total-value">{formatCurrency(tax)}</span>
          </div>
          <div className="total-row grand-total">
            <span className="total-label">合計金額</span>
            <span className="total-value">{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="invoice-footer">
          <div className="notes-section">
            <div className="notes-label">備考</div>
            <div className="notes-content">
              お取引ありがとうございます。<br />
              お振込手数料はお客様負担にてお願いします。
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoice
