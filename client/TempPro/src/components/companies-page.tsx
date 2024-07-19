import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import axios from 'axios';

// Mock data
// const companies = [
//   { name: 'Company-1', csrSpent: 'Amount 1', geography: '$29.99', domains: ['Water'], ratio: 'less than 0.3', email: 'email1@example.com' },
//   { name: 'Company-2', csrSpent: 'Amount 2', geography: '$49.99', domains: ['Sanitation'], ratio: '0.3 to 0.5', email: 'email2@example.com' },
//   { name: 'Company-3', csrSpent: 'Amount 3', geography: '$79.99', domains: ['Hygiene'], ratio: '0.5 to 0.75', email: 'email3@example.com' },
//   { name: 'Company-4', csrSpent: 'Amount 4', geography: '$59.99', domains: ['Water', 'Sanitation'], ratio: 'above 0.75', email: 'email4@example.com' },
// ];

export function CompaniesPage() {
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedRatios, setSelectedRatios] = useState([]);
  const [companies, setCompanies] = useState([]);

  try{
    axios.get('http://localhost:3000/gencomapany/companies')
    .then((response)=>{
      setCompanies(response.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  catch(error){
    console.log(error);
  }




  const handleDomainChange = (domain) => {
    setSelectedDomains((prevSelectedDomains) =>
      prevSelectedDomains.includes(domain)
        ? prevSelectedDomains.filter((d) => d !== domain)
        : [...prevSelectedDomains, domain]
    );
  };

  const handleRatioChange = (ratio) => {
    setSelectedRatios((prevSelectedRatios) =>
      prevSelectedRatios.includes(ratio)
        ? prevSelectedRatios.filter((r) => r !== ratio)
        : [...prevSelectedRatios, ratio]
    );
  };

  const filteredCompanies = companies.filter((company) => {
    const domainMatch = selectedDomains.length === 0 || company.domains.some((domain) => selectedDomains.includes(domain));
    const ratioMatch = selectedRatios.length === 0 || selectedRatios.includes(company.ratio);
    return domainMatch && ratioMatch;
  });

  return (

    <div className="flex flex-col  min-h-screen">
      <header className="flex h-16 items-center justify-between px-4 md:px-6 border-b">
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="py-8 md:py-12 lg:py-16 w-full max-w-4xl">
          <div className="container px-4 md:px-6">
            <div className="mb-6 md:mb-8 lg:mb-10">
              <Accordion type="single" collapsible>
                <AccordionItem value="filters">
                  <AccordionTrigger className="flex items-center justify-between">
                    <span className="text-lg text-white font-medium">Filters</span>
                    <ChevronDownIcon className="h-5 w-5 transition-transform group-[data-state=open]:rotate-180" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4">
                      <div>
                        <h3 className="mb-2 text-sm font-medium">Domains</h3>
                        <div className="grid gap-2">
                          {['Water', 'Sanitation', 'Hygiene'].map((domain) => (
                            <Label key={domain} className="flex items-center gap-2 font-normal">
                              <Checkbox
                                id={`domain-${domain}`}
                                onChange={() => handleDomainChange(domain)}
                                checked={selectedDomains.includes(domain)}
                              />
                              {domain}
                            </Label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-2 text-sm font-medium">Ratio of CSR spent to Unspent CSR</h3>
                        <div className="grid gap-2">
                          {['less than 0.3', '0.3 to 0.5', '0.5 to 0.75', 'above 0.75'].map((ratio) => (
                            <Label key={ratio} className="flex items-center gap-2 font-normal">
                              <Checkbox
                                id={`ratio-${ratio}`}
                                onChange={() => handleRatioChange(ratio)}
                                checked={selectedRatios.includes(ratio)}
                              />
                              {ratio}
                            </Label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="overflow-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-3 text-left font-medium">Company Name</th>
                    <th className="px-4 py-3 text-left font-medium">CSR Spent $</th>
                    <th className="px-4 py-3 text-right font-medium">Geography</th>
                    <th className="px-4 py-3 text-right font-medium">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-4">
                          <h3 className="text-lg font-semibold">{company.companyname}</h3>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{company.csrspent}</td>
                      <td className="px-4 py-3 text-right font-semibold">{company.geography}</td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = `mailto:${company.email}`}
                        >
                          Email
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-xs hover:underline underline-offset-4">Terms of Service</a>
          <a href="#" className="text-xs hover:underline underline-offset-4">Privacy</a>
        </nav>
      </footer>
    </div>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
