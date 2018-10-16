# nv-best-practice-reactjs

## Statefull component
Sử dụng hầu hết trong React vì có sử dụng API lifecycle của React, có ít nhất là 1 API function trong component.
```js
import React, { Component } from "react";
import {
  StateLessWithProps,
  StateLessWithoutProps
} from "./components/StateLess";

class App extends Component {

  state = {
    text: "Stateless with props"
  }

  componentDidMount() {
    this.setState({
      text: "After mounted"
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Stateless component/function</p>
          <StateLessWithoutProps />
          <StateLessWithProps style={{}} text={this.state.text} />
        </header>
      </div>
    );
  }
}
```

## Stateless component/function
Sử dụng khi render 01 component mà trả về hàm render các thẻ HTML và có thể tái sử dụng, không có API lifecycle của react.

Có 02 dạng stateless component/function.

### Stateless có props truyền vào
```js
const StateLessWithProps = ({ text, style }) => {
  return <div style={style}>{text}</div>;
};
```
Hoặc
```js
const StateLessWithProps = (props, style) => {
  return <div style={style}>{props.text}</div>;
};
// Có thể defined giá trị truyền vào của props
StateLessWithProps.propTypes = {
  text: PropTypes.string
}
```
### Stateless không có props truyền vào
```js
const StateLessWithoutProps = () => {
  return <div>State less function without props</div>;
};
```
> Lưu ý: nên sử dụng `StateLessWithProps` vì tính cơ động, có thể thay đổi giá trị của component mà không cần sửa giá trị ở trong component đó. Còn đối với `StateLessWithoutProps` nên dùng những static render chỉ cần 1 giá trị nhất định và chắc chắn không thay đổi.
## Thuộc tính lan truyền (spread attributes/operators)
Đây là tính năng mới của javascript ES5 (ECMAScript 5), sử dụng dấu "..." trước 1 object để lấy hết tất cả giá trị có trong object đó. Tương tự như trong React.
```js
// SpreadAttributes.js
export default props => {
  return (
    <div style={props.style}>
      <div>{props.title}</div>
      <span>{props.text}</span>
    </div>
  );
};

// App.js
spreadAttributes = () => {
  return {
    title: "This is a title",
    text: "text only"
  };
};
render() {
  return (
    <div className="App">
        <SpreadAttributes {...this.spreadAttributes()} />
    </div>
  );
}
```
> Sử dụng spread attributes/operators khi không biết component/function con cần bao nhiêu giá trị, sử dụng spread attributes/operators sẽ giúp code gọn hơn nhưng cần tránh sử dụng nhiều vì sẽ gây ra hậu quả là component/function con sẽ phải nhận những props không cần thiết.
## Điều kiện để render (Conditional rendering)
Không thể dùng `if/else` bình thường ở trong hàm render của 1 component, chỉ có thể dùng những điều kiện sau:
```js
// if
{condition && <span>Rendered when condition equal `true`</span>}
// unless
{condition || <span>Rendered when condition equal `false`</span>}
// if-else
{condition
  ? <span>Rendered when condition equal `true`</span>
  : <span>Rendered when condition equal `false`</span>
}
```
## Chilrend types
Có 03 kiểu chilrend trong react rendering:
### String
```html
<div>
  Hello world!!!
</div>
```
### Array
Có 02 kiểu array render và cả 2 kiểu render này nếu có thể HTML đều phải thêm field `key` để tạo `unique key` cho từng giá trị con 
#### Static rendering
```js
<div>
  {["Hello ", <span key={1}>World</span>]}
</div>
```
#### Dynamic rendering
Thường sử dụng để tạo các danh sách/list
```js
<ul>
  {["first", "second"].map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>
```
> Lưu ý: không nên sử dụng `key={index}` của function `map` mà nên sử dụng `key={item.id}` của chính element trong array data đó để tránh danh sách/list sắp xếp lại sau mỗi lần render của component.
### Function
Có 02 kiểu function rendering và cả 2 kiểu này function được tạo ra phải có giá trị trả về: `return`
#### Trực tiếp tạo trong hàm render
```js
<div>
  {(() => { return "hello world!"})()}
</div>
```
#### Tạo function và gán function từ ngoài
```js
renderFunction = () => {
  return (
    <div>This is a function</div>
  )
}

render() {
  return (
    <div>
      {this.renderFunction()}
    </div>
  )
}
```
> Lưu ý: nên sử dụng cách 2 vì nhìn sẽ gọn và đỡ rối mắt hơn cách 1.


