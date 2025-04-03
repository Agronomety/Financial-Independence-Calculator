import React, { useState } from 'react';
import './App.css';

function App() {
    const [formData, setFormData] = useState({
      monthlySavings: 1000,
      annualGrowthRate: 0.07,
      initialAmount: 0,
      targetAmount: ''
    });
    
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch('http://localhost:3000/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Calculation failed');
        }
        
        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(amount);
    };
    
    return (
      <div className="App">
        <header className="App-header">
          <h1>Financial Independence Calculator</h1>
          <p>Calculate how long it will take to reach financial freedom</p>
        </header>
        
        <main className="container">
          <div className="card">
            <h2>Enter Your Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="monthlySavings">Monthly Investment:</label>
                <input
                  type="number"
                  id="monthlySavings"
                  name="monthlySavings"
                  value={formData.monthlySavings}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="annualGrowthRate">Annual Growth Rate (%):</label>
                <input
                  type="number"
                  id="annualGrowthRate"
                  name="annualGrowthRate"
                  value={formData.annualGrowthRate * 100}
                  onChange={(e) => handleChange({
                    target: {
                      name: 'annualGrowthRate',
                      value: parseFloat(e.target.value) / 100
                    }
                  })}
                  step="0.1"
                  min="0"
                  max="30"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="initialAmount">Initial Investment (optional):</label>
                <input
                  type="number"
                  id="initialAmount"
                  name="initialAmount"
                  value={formData.initialAmount}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="targetAmount">Target Amount (optional):</label>
                <input
                  type="number"
                  id="targetAmount"
                  name="targetAmount"
                  value={formData.targetAmount}
                  onChange={handleChange}
                  min="0"
                  placeholder="Default: 25x annual expenses"
                />
              </div>
              
              <button type="submit" disabled={loading}>
                {loading ? 'Calculating...' : 'Calculate'}
              </button>
            </form>
            
            {error && <div className="error">{error}</div>}
            
            {result && (
              <div className="result">
                <h3>Results</h3>
                <p className="highlight">
                  Time to Financial Independence: <strong>{result.years} years</strong>
                </p>
                <p>
                  Target Amount: <strong>{formatCurrency(result.targetAmount)}</strong>
                </p>
                <p>
                  Final Amount: <strong>{formatCurrency(result.finalAmount)}</strong>
                </p>
                <p>
                  Total Contributions: <strong>{formatCurrency(result.totalContributions)}</strong>
                </p>
                <p>
                  Investment Growth: <strong>{formatCurrency(result.totalGrowth)}</strong>
                </p>
                
                {result.milestones.length > 0 && (
                  <div className="milestones">
                    <h4>Milestones</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Years</th>
                          <th>Projected Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.milestones.map((milestone, index) => (
                          <tr key={index}>
                            <td>{milestone.years}</td>
                            <td>{formatCurrency(milestone.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }
  
  export default App;