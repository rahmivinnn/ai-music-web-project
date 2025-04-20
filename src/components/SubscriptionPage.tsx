import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  Home, 
  Library, 
  History, 
  Bell, 
  Settings,
  LogOut,
  Check,
  ChevronRight,
  CreditCard,
  User
} from 'lucide-react';
import prismLogo from '../assets/dark-side-logo.svg';

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleLogout = () => {
    navigate('/');
  };

  const goToHome = () => {
    navigate('/remix');
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete subscription process
      navigate('/remix');
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Subscription plans
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$0',
      period: 'Free forever',
      features: [
        '5 AI remixes per month',
        'Basic voice effects',
        'Standard quality export',
        'Community support'
      ],
      recommended: false
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '$9.99',
      period: 'per month',
      features: [
        'Unlimited AI remixes',
        'Advanced voice effects',
        'High quality export',
        'Priority support',
        'No watermark',
        'Commercial usage'
      ],
      recommended: true
    },
    {
      id: 'team',
      name: 'Team',
      price: '$19.99',
      period: 'per month',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Shared library',
        'API access',
        'Dedicated support',
        'Custom branding'
      ],
      recommended: false
    }
  ];

  // Selected plan
  const [selectedPlan, setSelectedPlan] = useState('pro');

  // Payment details
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Render step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`border ${
                    selectedPlan === plan.id 
                      ? 'border-[#41FDFE]' 
                      : 'border-gray-700'
                  } ${
                    plan.recommended 
                      ? 'relative' 
                      : ''
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#41FDFE] text-black px-3 py-1 rounded-full text-xs font-bold">
                      RECOMMENDED
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-400 ml-1">{plan.period}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-[#41FDFE] mr-2 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${
                        selectedPlan === plan.id 
                          ? 'bg-[#41FDFE] text-black hover:bg-[#41FDFE]/90' 
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
            <Card className="border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:border-[#41FDFE]"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full p-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:border-[#41FDFE]"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:border-[#41FDFE]"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:border-[#41FDFE]"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 3:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-[#41FDFE]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-10 w-10 text-[#41FDFE]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Confirm Your Subscription</h2>
              <p className="text-gray-400">You're about to subscribe to the {plans.find(p => p.id === selectedPlan)?.name} plan</p>
            </div>
            
            <Card className="border-gray-700 mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
                  <div className="text-left">
                    <h3 className="font-bold">{plans.find(p => p.id === selectedPlan)?.name}</h3>
                    <p className="text-gray-400 text-sm">Monthly subscription</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{plans.find(p => p.id === selectedPlan)?.price}</p>
                    <p className="text-gray-400 text-sm">per month</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>{plans.find(p => p.id === selectedPlan)?.price}</span>
                </div>
              </CardContent>
            </Card>
            
            <p className="text-sm text-gray-400 mb-6">
              By clicking "Confirm Payment", you agree to our Terms of Service and Privacy Policy.
              You will be charged {plans.find(p => p.id === selectedPlan)?.price} monthly until you cancel your subscription.
            </p>
          </div>
        );
      
      case 4:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-[#41FDFE]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-10 w-10 text-[#41FDFE]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Subscription Activated!</h2>
              <p className="text-gray-400">
                Thank you for subscribing to AI Music Web. Your {plans.find(p => p.id === selectedPlan)?.name} plan is now active.
              </p>
            </div>
            
            <Card className="border-gray-700 mb-6">
              <CardContent className="p-6 text-left">
                <h3 className="font-bold mb-4">What's included in your plan:</h3>
                <ul className="space-y-2">
                  {plans.find(p => p.id === selectedPlan)?.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[#41FDFE] mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#0e0b16] text-white">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-[#1a1625] flex flex-col">
        <div className="p-4 flex justify-center md:justify-start items-center">
          <img src={prismLogo} alt="Prism Logo" className="h-10 w-10 mr-2" />
          <span className="hidden md:block text-xl font-bold">AI Music Web</span>
        </div>
        
        <div className="flex-1 mt-8">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start hover:text-[#41FDFE]" onClick={goToHome}>
              <Home className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Home</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:text-[#41FDFE]" onClick={() => navigate('/history')}>
              <History className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Remix History</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:text-[#41FDFE]" onClick={() => navigate('/library')}>
              <Library className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">My Library</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-[#41FDFE]" onClick={() => navigate('/subscription')}>
              <User className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Subscription</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:text-[#41FDFE]" onClick={() => navigate('/notifications')}>
              <Bell className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Notifications</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:text-[#41FDFE]" onClick={() => navigate('/settings')}>
              <Settings className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Settings</span>
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <Button variant="ghost" className="w-full justify-start hover:text-[#41FDFE]" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-3xl font-bold">Subscription</h1>
          <p className="text-gray-400 mt-1">Upgrade your account to unlock premium features</p>
        </div>
        
        {/* Step indicator */}
        {step < 4 && (
          <div className="px-6 py-4">
            <div className="flex justify-between max-w-2xl mx-auto">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-[#41FDFE]' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#41FDFE] text-black' : 'bg-gray-800'}`}>
                  {step > 1 ? <Check size={20} /> : 1}
                </div>
                <span className="text-xs mt-1">Choose Plan</span>
              </div>
              <div className={`flex-1 border-t border-gray-700 self-center mx-2 ${step >= 2 ? 'border-[#41FDFE]' : ''}`}></div>
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-[#41FDFE]' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#41FDFE] text-black' : 'bg-gray-800'}`}>
                  {step > 2 ? <Check size={20} /> : 2}
                </div>
                <span className="text-xs mt-1">Payment</span>
              </div>
              <div className={`flex-1 border-t border-gray-700 self-center mx-2 ${step >= 3 ? 'border-[#41FDFE]' : ''}`}></div>
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-[#41FDFE]' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#41FDFE] text-black' : 'bg-gray-800'}`}>
                  {step > 3 ? <Check size={20} /> : 3}
                </div>
                <span className="text-xs mt-1">Confirm</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {renderStepContent()}
        </div>
        
        {/* Navigation buttons */}
        <div className="p-6 border-t border-gray-800 flex justify-between">
          <Button 
            variant="outline" 
            onClick={step === 1 ? goToHome : prevStep}
            className="border-gray-700"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          <Button 
            onClick={nextStep}
            className="bg-[#41FDFE] text-black hover:bg-[#41FDFE]/90"
          >
            {step === 4 ? 'Go to Dashboard' : step === 3 ? 'Confirm Payment' : 'Continue'}
            {step < 4 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
