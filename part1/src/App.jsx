const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  );
};

const App = () => {
  const name = "Jukka";
  const age = 10;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={name} age={20 + 10} />
      <Hello name="Mikko" age={age + 15} />
    </div>
  );
};

export default App;
