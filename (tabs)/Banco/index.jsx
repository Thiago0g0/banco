import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';

const Withdraw = ({ balance, onWithdraw }) => {
  const [amount, setAmount] = useState('');

  const handleWithdraw = () => {
    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido para saque.');
      return;
    }
    onWithdraw(withdrawalAmount);
    setAmount('');
  }; 
  

  return (
    <View style={styles.container}>
      <Image style={styles.logo}
      source={require('../../../assets/images/santander.png')}
      />
      <Text style={styles.header}>Saque</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        placeholder="Valor do saque"
      />
      <Button 
      styles={styles.button} 
      title="Sacar" 
      onPress={handleWithdraw} 
      />
    </View>
  );
};

const Deposit = ({ onDeposit }) => {
  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido para depósito.');
      return;
    }
    onDeposit(depositAmount);
    setAmount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Depósito</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        placeholder="Valor do depósito"
      />
      <Button 
      styles={styles.button}
      title="Depositar" 
      onPress={handleDeposit} 
      />
    </View>
  );
};

const App = () => {
  const [balance, setBalance] = useState(7320.92);

  const handleWithdraw = (amount) => {
    if (amount > balance) {
      Alert.alert('Erro', 'Saldo insuficiente para o saque.');
      return;
    }
    const newBalance = balance - amount;
    const fine = 0.025 * newBalance;
    setBalance(newBalance - fine);
  };

  const handleDeposit = (amount) => {
    const bonus = 0.01 * amount;
    setBalance(balance + amount + bonus);
  };

  return (
    <View style={styles.appContainer}>
      <Text style={styles.balance}>Saldo da Conta: R$ {balance.toFixed(2)}</Text>
      <Withdraw balance={balance} onWithdraw={handleWithdraw} />
      <Deposit onDeposit={handleDeposit} />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  container: {
    marginVertical: 10,
    width: '23%',
    height: '%',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button:{
    backgroundColor: '#FF0000',
    color: '#FF0000',
  }
  
});

export default App;
