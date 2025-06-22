import { useEffect, useRef, useState } from 'react'
//styles
import './App.css';
//components
import Navbar from './components/Navbar/Navbar'
import AppHead from './components/AppHead/AppHead'
import AppBody from './components/AppBody/AppBody';
//contexts
import { TransactionsContext, MoneyContext } from "./Contexts/AllContexts"
//variables
import { dummyData } from './dummyTransactions';

function App() {
  const [money, setMoney] = useState({
    balance: 5000,
    expenses: 1200
  })
  const [transactionData, setTransactionData] = useState(dummyData);
  const initialRender = useRef(true);

  useEffect(()=>{
    if(initialRender.current)  onLoad();

    return(() => {
      initialRender.current = false;
    })
  }, [])

useEffect(() => {
  if (!initialRender.current) {
    localStorage.setItem("allData", JSON.stringify({ money, transactionData }));
  } else {
    initialRender.current = false;
  }
}, [transactionData, money]);


  //functions
  const onLoad = () => {
    //load data from local storage if present
    const localData = localStorage.getItem("allData");
    if(localData){
      const {money, transactionData} = JSON.parse(localData);
      setMoney(money);
      setTransactionData(transactionData);
    }
  }
  

  return (
    <main className='App'>
      <h1>Expense Tracker</h1>
      <MoneyContext.Provider value={[money, setMoney]}>
      <TransactionsContext.Provider value={[transactionData, setTransactionData]}>
        <AppHead balance={money.balance} expenses={money.expenses}/>
        <AppBody transactionData={transactionData}/>
      </TransactionsContext.Provider> 
      </MoneyContext.Provider>
    </main>
  )
}

export default App
