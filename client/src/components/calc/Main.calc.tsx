import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Leaf, Droplets, Weight, Zap } from 'lucide-react';
import { conversionData } from './conversionData';

const UnitConverter = () => {
  const [selectedCategory, setSelectedCategory] = useState('volume');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  // Set initial units based on the selected category
  useEffect(() => {
    const categoryData = conversionData[selectedCategory];
    if (categoryData?.units.length > 0) {
      setFromUnit(categoryData.units[0].value);
      setToUnit(categoryData.units[1].value);
    }
  }, [selectedCategory]);

  // Convert units whenever input, fromUnit, or toUnit changes
  useEffect(() => {
    if (!inputValue || !fromUnit || !toUnit) {
      setOutputValue('');
      return;
    }

    const inputValueNumber = parseFloat(inputValue);
    if (isNaN(inputValueNumber)) {
      setOutputValue('Invalid input');
      return;
    }

    const categoryData = conversionData[selectedCategory];
    const conversion = categoryData.conversions.find(
      conv => conv.from === fromUnit && conv.to === toUnit
    );

    if (conversion) {
      const result = inputValueNumber * conversion.factor;
      setOutputValue(result.toString());
    } else {
      // If direct conversion not found, try reverse conversion
      const reverseConversion = categoryData.conversions.find(
        conv => conv.from === toUnit && conv.to === fromUnit
      );
      
      if (reverseConversion) {
        const result = inputValueNumber / reverseConversion.factor;
        setOutputValue(result.toString());
      } else {
        setOutputValue('Conversion not available');
      }
    }
  }, [inputValue, fromUnit, toUnit, selectedCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const formatOutput = (value: string) => {
    if (!value || value === 'Conversion not available' || value === 'Invalid input') {
      return value;
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;
    
    // Format based on the value size
    if (Math.abs(numValue) < 0.000001 || Math.abs(numValue) > 999999999) {
      return numValue.toExponential(6);
    }
    
    return numValue.toString().includes('.') 
      ? numValue.toFixed(Math.min(6, value.split('.')[1]?.length || 0)) 
      : numValue.toString();
  };

  const getSustainabilityMessage = () => {
    switch (selectedCategory) {
      case 'volume':
        return "Efficient water usage saves 6,800 gallons per household annually.";
      case 'weight':
        return "Reducing 1 tonne of waste prevents 2.5 tonnes of CO2 emissions.";
      case 'energy':
        return "Every gigajoule saved is approximately 277 kWh not produced.";
      default:
        return "Small conversions lead to big sustainability impacts.";
    }
  };

  const getCategoryIcon = () => {
    switch (selectedCategory) {
      case 'volume':
        return <Droplets className="h-5 w-5 text-blue-500" />;
      case 'weight':
        return <Weight className="h-5 w-5 text-orange-500" />;
      case 'energy':
        return <Zap className="h-5 w-5 text-yellow-500" />;
      default:
        return <Leaf className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto border-green-100 bg-gradient-to-br from-white to-green-50 ">
      <CardHeader className="border-b border-green-100">
        <div className="flex items-center justify-center space-x-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <CardTitle className="text-center text-green-800">Sustainable Unit Converter</CardTitle>
        </div>
        <CardDescription className="text-center text-green-600">
          {getSustainabilityMessage()}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs 
          defaultValue="volume" 
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-green-100/50">
            <TabsTrigger value="volume" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
              <div className="flex items-center space-x-2">
                <Droplets className="h-4 w-4" />
                <span>Volume</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="weight" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800">
              <div className="flex items-center space-x-2">
                <Weight className="h-4 w-4" />
                <span>Weight</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="energy" className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-800">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Energy</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          {Object.keys(conversionData).map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fromUnit" className="flex items-center text-green-700">
                      {getCategoryIcon()} <span className="ml-2">From</span>
                    </Label>
                    <Select 
                      value={fromUnit} 
                      onValueChange={setFromUnit}
                    >
                      <SelectTrigger id="fromUnit" className="border-green-200 focus:ring-green-500">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {conversionData[category as keyof typeof conversionData].units.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="inputValue" className="text-green-700">Value</Label>
                    <Input
                      id="inputValue"
                      type="number"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Enter value"
                      className="border-green-200 focus-visible:ring-green-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="toUnit" className="flex items-center text-green-700">
                      {getCategoryIcon()} <span className="ml-2">To</span>
                    </Label>
                    <Select 
                      value={toUnit} 
                      onValueChange={setToUnit}
                    >
                      <SelectTrigger id="toUnit" className="border-green-200 focus:ring-green-500">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {conversionData[category as keyof typeof conversionData].units.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="outputValue" className="text-green-700">Result</Label>
                    <Input
                      id="outputValue"
                      value={formatOutput(outputValue)}
                      readOnly
                      className="bg-green-50 border-green-200"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border rounded-md overflow-hidden border-green-200">
                <div className="bg-green-100/50 py-2 px-4 text-green-800 font-medium flex items-center">
                  <Leaf className="h-4 w-4 mr-2" />
                  <span>Conversion Factors</span>
                </div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="px-4 py-2 text-left w-1/4 text-green-700 border-b border-green-200">From</th>
                      <th className="px-4 py-2 text-center w-1/4 text-green-700 border-b border-green-200">1</th>
                      <th className="px-4 py-2 text-left w-1/4 text-green-700 border-b border-green-200">To</th>
                      <th className="px-4 py-2 text-center w-1/4 text-green-700 border-b border-green-200">Factor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conversionData[category as keyof typeof conversionData].conversions.map((conv, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-green-50/50"}>
                        <td className="px-4 py-2 border-r border-green-100">
                          {conversionData[category as keyof typeof conversionData].units.find(u => u.value === conv.from)?.label}
                        </td>
                        <td className="px-4 py-2 text-center border-r border-green-100">1</td>
                        <td className="px-4 py-2 border-r border-green-100">
                          {conversionData[category as keyof typeof conversionData].units.find(u => u.value === conv.to)?.label}
                        </td>
                        <td className="px-4 py-2 text-center text-green-700">
                          {conv.factor < 0.000001 || conv.factor > 999999999 
                            ? conv.factor.toExponential(8) 
                            : conv.factor}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UnitConverter;