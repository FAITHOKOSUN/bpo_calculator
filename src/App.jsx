import React, { useState } from 'react';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    businessName: '',
    annualSalary: 35000,
    currency: 'GBP',
    numberOfHires: 3,
    sector: 'customer-service',
    country: 'United Kingdom',
    location: 'london'
  });

  const locationMultipliers = {
    london: 1.3,
    southeast: 1.15,
    midlands: 1.0,
    north: 0.9,
    scotland: 0.95,
    wales: 0.92,
    northernireland: 0.88,
    other: 1.0
  };

  const sectorMultipliers = {
    'customer-service': 1.0,
    'finance': 1.3,
    'it-support': 1.25,
    'hr': 1.15,
    'sales': 1.2,
    'data-entry': 0.85,
    'other': 1.0
  };

  const roleNames = {
    'customer-service': 'Customer Service Rep',
    'finance': 'Finance & Accounting',
    'it-support': 'IT Support Tech',
    'hr': 'HR Coordinator',
    'sales': 'Sales & Marketing',
    'data-entry': 'Data Entry Specialist',
    'other': 'Business Support'
  };

  const teamLeadRates = {
    london: 38,
    southeast: 35,
    midlands: 32,
    north: 30,
    scotland: 31,
    wales: 30,
    northernireland: 29,
    other: 34
  };

  const accountManagerRates = {
    london: 52,
    southeast: 48,
    midlands: 45,
    north: 42,
    scotland: 44,
    wales: 42,
    northernireland: 40,
    other: 48
  };

  const calculateCosts = () => {
    const { annualSalary, numberOfHires, sector, location } = inputs;
    
    const locationMult = locationMultipliers[location];
    const sectorMult = sectorMultipliers[sector];
    const adjustedSalary = annualSalary * locationMult * sectorMult;
    const agentRate = adjustedSalary / 2080;
    
    const teamLeadRate = teamLeadRates[location];
    const accountManagerRate = accountManagerRates[location];
    
    const agentYearlyInHouse = numberOfHires * agentRate * 2080 * 1.8;
    const agentYearlyOutsourced = numberOfHires * agentRate * 2080 * 1.06;
    const teamLeadYearly = Math.ceil(numberOfHires / 15) * teamLeadRate * 2080;
    const accountManagerYearly = accountManagerRate * 2080;
    const trainingInHouse = (numberOfHires / 20) * 21500;
    const trainingOutsourced = (numberOfHires / 20) * 15000;
    
    const directCostsInHouse = agentYearlyInHouse + teamLeadYearly + accountManagerYearly + trainingInHouse;
    const directCostsOutsourced = agentYearlyOutsourced + trainingOutsourced;
    
    const officeSpace = (numberOfHires / 20) * 126720;
    const hardwareSoftware = (numberOfHires / 20) * 110000;
    const indirectCosts = (numberOfHires / 20) * 176380;
    
    const overheadInHouse = officeSpace + hardwareSoftware + indirectCosts;
    
    const totalInHouse = directCostsInHouse + overheadInHouse;
    const totalOutsourced = directCostsOutsourced;
    const savings = totalInHouse - totalOutsourced;
    const savingsPercent = Math.round((savings / totalInHouse) * 100);
    const fiveYearSavings = savings * 5;
    
    return {
      agentRate: Math.round(agentRate),
      teamLeadRate,
      accountManagerRate,
      agentYearlyInHouse,
      agentYearlyOutsourced,
      teamLeadYearly,
      accountManagerYearly,
      trainingInHouse,
      trainingOutsourced,
      directCostsInHouse,
      directCostsOutsourced,
      officeSpace,
      hardwareSoftware,
      indirectCosts,
      overheadInHouse,
      totalInHouse,
      totalOutsourced,
      savings,
      savingsPercent,
      fiveYearSavings
    };
  };

  const costs = calculateCosts();

  const getCurrencySymbol = () => {
    const symbols = {
      'GBP': '£',
      'USD': '$',
      'EUR': '€',
      'AUD': 'A$',
      'CAD': 'C$'
    };
    return symbols[inputs.currency] || '£';
  };

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '300', textAlign: 'center', marginBottom: '16px', fontFamily: 'serif', color: '#1a1a1a' }}>
          True Cost Calculator
        </h1>
        <p style={{ textAlign: 'center', fontSize: '16px', color: '#666', maxWidth: '850px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          Discover your complete hiring costs vs. outsourcing with Lifted Horizon BPO. Our calculator reveals hidden expenses like recruitment, training, benefits, office space, and management overhead.
        </p>

        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', maxWidth: '1200px', margin: '0 auto 40px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a', textTransform: 'uppercase' }}>Business Name</label>
              <input 
                type="text" 
                value={inputs.businessName} 
                onChange={(e) => setInputs({...inputs, businessName: e.target.value})} 
                style={{ width: '100%', height: '44px', border: '1.5px solid #D0D0D0', borderRadius: '4px', padding: '0 14px', fontSize: '15px' }} 
                placeholder="Enter your business name"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a', textTransform: 'uppercase' }}>Industry Sector</label>
              <select 
                value={inputs.sector}
                onChange={(e) => setInputs({...inputs, sector: e.target.value})}
                style={{ width: '100%', height: '44px', border: '1.5px solid #D0D0D0', borderRadius: '4px', padding: '0 14px', fontSize: '15px', background: 'white' }}
              >
                <option value="customer-service">Customer Service</option>
                <option value="finance">Finance & Accounting</option>
                <option value="it-support">IT Support</option>
                <option value="hr">Human Resources</option>
                <option value="sales">Sales & Marketing</option>
                <option value="data-entry">Data Entry</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a', textTransform: 'uppercase' }}>Annual Salary</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px', color: '#666', fontWeight: '500', zIndex: 1 }}>{getCurrencySymbol()}</span>
                  <input 
                    type="number" 
                    value={inputs.annualSalary} 
                    onChange={(e) => setInputs({...inputs, annualSalary: Number(e.target.value)})} 
                    style={{ width: '100%', height: '44px', border: '1.5px solid #D0D0D0', borderRadius: '4px', padding: '0 14px 0 40px', fontSize: '15px' }} 
                  />
                </div>
                <select 
                  value={inputs.currency}
                  onChange={(e) => setInputs({...inputs, currency: e.target.value})}
                  style={{ width: '110px', height: '44px', border: '1.5px solid #D0D0D0', borderRadius: '4px', padding: '0 10px', fontSize: '14px', background: 'white' }}
                >
                  <option value="GBP">GBP (£)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="AUD">AUD</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a', textTransform: 'uppercase' }}>Number of Hires</label>
              <input 
                type="number" 
                value={inputs.numberOfHires} 
                onChange={(e) => setInputs({...inputs, numberOfHires: Number(e.target.value)})} 
                style={{ width: '100%', height: '44px', border: '1.5px solid #D0D0D0', borderRadius: '4px', padding: '0 14px', fontSize: '15px' }} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: inputs.country === 'United Kingdom' ? 'repeat(auto-fit, minmax(250px, 1fr))' : '1fr', gap: '25px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a', textTransform: 'uppercase' }}>Country</label>
              <select 
                value={inputs.country}
                onChange={(e) => setInputs({...inputs, country: e.target.value, location: 'other'})}
                style={{ width: '100%', height: '44px', border: '1.5px solid #D0D0D0', borderRadius: '4px', padding: '0 14px', fontSize: '15px', background: 'white' }}
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {inputs.country === 'United Kingdom' && (
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a', textTransform: 'uppercase' }}>UK Location</label>
                <select 
                  value={inputs.location}
                  onChange={(e) => setInputs({...inputs, location: e.target.value})}
                  style={{ width: '100%', height: '44px', border: '1.5px solid #D0D0D0', borderRadius: '4px', padding: '0 14px', fontSize: '15px', background: 'white' }}
                >
                  <option value="london">London</option>
                  <option value="southeast">South East</option>
                  <option value="midlands">Midlands</option>
                  <option value="north">North</option>
                  <option value="scotland">Scotland</option>
                  <option value="wales">Wales</option>
                  <option value="northernireland">N. Ireland</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto 30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1a1a1a' }}>
            Direct Employee Costs
          </h2>
          <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #E0E0E0' }}>
            <div style={{ minWidth: '600px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <thead>
                <tr style={{ background: '#0066CC', color: 'white' }}>
                  <th style={{ padding: '14px', textAlign: 'left', fontSize: '14px' }}>Role</th>
                  <th style={{ padding: '14px', textAlign: 'center', fontSize: '14px' }}>Hourly</th>
                  <th style={{ padding: '14px', textAlign: 'center', fontSize: '14px', background: '#0052A3' }}>In-House</th>
                  <th style={{ padding: '14px', textAlign: 'center', fontSize: '14px', background: '#003D7A' }}>Outsourced</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <td style={{ padding: '14px', fontSize: '15px' }}>{roleNames[inputs.sector]}</td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px' }}>
                    {getCurrencySymbol()}{costs.agentRate}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#FAFAFA' }}>
                    {getCurrencySymbol()}{Math.round(costs.agentYearlyInHouse).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#F0F8FF' }}>
                    {getCurrencySymbol()}{Math.round(costs.agentYearlyOutsourced).toLocaleString()}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <td style={{ padding: '14px', fontSize: '15px' }}>Team Lead</td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px' }}>
                    {getCurrencySymbol()}{costs.teamLeadRate}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#FAFAFA' }}>
                    {getCurrencySymbol()}{Math.round(costs.teamLeadYearly).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#F0F8FF', color: '#0066CC' }}>
                    Included
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <td style={{ padding: '14px', fontSize: '15px' }}>Account Manager</td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px' }}>
                    {getCurrencySymbol()}{costs.accountManagerRate}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#FAFAFA' }}>
                    {getCurrencySymbol()}{Math.round(costs.accountManagerYearly).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#F0F8FF', color: '#0066CC' }}>
                    Included
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <td style={{ padding: '14px', fontSize: '15px' }}>Training</td>
                  <td style={{ padding: '14px' }}></td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#FAFAFA' }}>
                    {getCurrencySymbol()}{Math.round(costs.trainingInHouse).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#F0F8FF' }}>
                    {getCurrencySymbol()}{Math.round(costs.trainingOutsourced).toLocaleString()}
                  </td>
                </tr>
                <tr style={{ background: '#E3F2FD' }}>
                  <td style={{ padding: '14px', fontSize: '16px', fontWeight: '700', color: '#0066CC' }}>Subtotal</td>
                  <td style={{ padding: '14px' }}></td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '17px', fontWeight: '700', color: '#0066CC' }}>
                    {getCurrencySymbol()}{Math.round(costs.directCostsInHouse).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '17px', fontWeight: '700', color: '#0066CC' }}>
                    {getCurrencySymbol()}{Math.round(costs.directCostsOutsourced).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto 30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1a1a1a' }}>
            Hidden Overhead & Indirect Costs
          </h2>
          <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #E0E0E0' }}>
            <div style={{ minWidth: '600px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <thead>
                <tr style={{ background: '#0066CC', color: 'white' }}>
                  <th style={{ padding: '14px', textAlign: 'left', fontSize: '14px' }}>Cost Category</th>
                  <th style={{ padding: '14px', textAlign: 'center', fontSize: '14px', background: '#0052A3' }}>In-House</th>
                  <th style={{ padding: '14px', textAlign: 'center', fontSize: '14px', background: '#003D7A' }}>Outsourced</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <td style={{ padding: '14px', fontSize: '15px' }}>Office Space</td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#FAFAFA' }}>
                    {getCurrencySymbol()}{Math.round(costs.officeSpace).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#F0F8FF', color: '#0066CC' }}>
                    Included
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <td style={{ padding: '14px', fontSize: '15px' }}>Hardware & IT</td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#FAFAFA' }}>
                    {getCurrencySymbol()}{Math.round(costs.hardwareSoftware).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#F0F8FF', color: '#0066CC' }}>
                    Included
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <td style={{ padding: '14px', fontSize: '15px' }}>Benefits & Insurance</td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#FAFAFA' }}>
                    {getCurrencySymbol()}{Math.round(costs.indirectCosts).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '15px', background: '#F0F8FF', color: '#0066CC' }}>
                    Included
                  </td>
                </tr>
                <tr style={{ background: '#E3F2FD' }}>
                  <td style={{ padding: '14px', fontSize: '16px', fontWeight: '700', color: '#0066CC' }}>Subtotal</td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '17px', fontWeight: '700', color: '#0066CC' }}>
                    {getCurrencySymbol()}{Math.round(costs.overheadInHouse).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', fontSize: '17px', fontWeight: '700', color: '#0066CC' }}>
                    {getCurrencySymbol()}0
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto 40px' }}>
          <div style={{ background: '#003D7A', color: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '700' }}>Total Costs</div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>
                {getCurrencySymbol()}{Math.round(costs.totalInHouse).toLocaleString()}
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>
                {getCurrencySymbol()}{Math.round(costs.totalOutsourced).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0066CC 0%, #003D7A 100%)', padding: '60px 30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <h2 style={{ color: 'white', fontSize: '40px', fontWeight: '400', textAlign: 'center', marginBottom: '50px', fontFamily: 'serif' }}>
            The Real Savings: Beyond Just Salaries
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '50px', maxWidth: '1000px', margin: '0 auto 50px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#6ECDA5', fontSize: '48px', fontWeight: '700', marginBottom: '12px' }}>
                {getCurrencySymbol()}{Math.round(costs.savings).toLocaleString()}
              </div>
              <div style={{ color: 'white', fontSize: '16px' }}>Your Annual Savings</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#6ECDA5', fontSize: '48px', fontWeight: '700', marginBottom: '12px' }}>
                {costs.savingsPercent}%
              </div>
              <div style={{ color: 'white', fontSize: '16px' }}>Reduced Hiring Costs</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#6ECDA5', fontSize: '48px', fontWeight: '700', marginBottom: '12px' }}>
                {getCurrencySymbol()}{Math.round(costs.fiveYearSavings).toLocaleString()}
              </div>
              <div style={{ color: 'white', fontSize: '16px' }}>5-Year Savings</div>
            </div>
          </div>
          
          <p style={{ textAlign: 'center', color: '#E8F4FF', fontSize: '15px', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 30px' }}>
            Our team can walk you through the detailed breakdown, answer questions about hidden costs, and customize scenarios for your specific hiring needs.
          </p>
          <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '0 auto 30px' }}>
            *Estimates based on industry benchmarks. Contact us for a personalized analysis.
          </p>
          <div style={{ textAlign: 'center' }}>
            <button style={{ background: '#6ECDA5', color: '#003D7A', border: 'none', padding: '16px 40px', fontSize: '16px', fontWeight: '600', borderRadius: '6px', cursor: 'pointer' }}>
              Learn More
            </button>
          </div>
        </div>

        <div style={{ background: '#0066CC', padding: '50px 30px', borderRadius: '12px', marginTop: '60px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <h2 style={{ color: 'white', fontSize: '36px', fontWeight: '400', textAlign: 'center', marginBottom: '16px', fontFamily: 'serif' }}>
            Get Your Detailed Cost Analysis Report
          </h2>
          <p style={{ color: 'white', textAlign: 'center', fontSize: '15px', maxWidth: '650px', margin: '0 auto 40px', lineHeight: '1.5' }}>
            Receive a comprehensive breakdown of your hiring costs, including hidden expenses most companies overlook.
          </p>
          <div style={{ background: 'white', padding: '40px 30px', borderRadius: '8px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <input type="text" placeholder="First Name*" style={{ padding: '14px', border: '1px solid #D0D0D0', borderRadius: '4px', fontSize: '15px' }} />
              <input type="text" placeholder="Last Name*" style={{ padding: '14px', border: '1px solid #D0D0D0', borderRadius: '4px', fontSize: '15px' }} />
            </div>
            <input type="email" placeholder="Business Email*" style={{ width: '100%', padding: '14px', border: '1px solid #D0D0D0', borderRadius: '4px', fontSize: '15px', marginBottom: '20px' }} />
            <input type="tel" placeholder="Phone (Optional)" style={{ width: '100%', padding: '14px', border: '1px solid #D0D0D0', borderRadius: '4px', fontSize: '15px', marginBottom: '20px' }} />
            <button style={{ width: '100%', padding: '16px', background: '#0066CC', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
              Get My Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;