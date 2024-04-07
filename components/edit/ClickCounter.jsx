function ClickCounter(props) {
  const { setClickCounter } = props;
  const onClickHandler = () => {
    setClickCounter((previousValue) => previousValue + 1);
    console.log("Click Counter is clicked");
  };
  return <button onClick={onClickHandler}>Click Counter</button>;
}
export default ClickCounter;
