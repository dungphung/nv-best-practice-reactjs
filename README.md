# Nội dung
1. [Stateful component](#stateful)
2. [Stateless component/function](#stateless)
3. [Thuộc tính lan truyền (spread attributes/operators)](#spread)
4. [Điều kiện để render (Conditional rendering)](#conditional)
5. [Handling event (Các event onClick, onChange, ...)](#handling-event)
6. [Chilrend types](#chilrend)
7. [Higher-Order Components (HOCs)](#hocs)

## <a id="stateful" ></a> Stateful component
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

## <a id="stateless" ></a>Stateless component/function
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
## <a id="spread" ></a>Thuộc tính lan truyền (spread attributes/operators)
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
## <a id="conditional" ></a>Điều kiện để render (Conditional rendering)
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
## <a id="handling-event" ></a>Handling event (Các event onClick, onChange, ...)
Các function event được tạo ra phải `bind` vào API `constructor()` của React để biến `this` hoạt động trong `callback`
```js
constructor(props) {
  super(props);
  this.state = {
    text: "Hello world!!!"
  };
  // Must have when create new function that using by an event like onClick or onChange
  this.onChange = this.onChange.bind(this);
}

onChange = e => {
  this.setState({
    text: e.target.value
  });
};
```
Hoặc nếu đã có sẵn `@autobind` khi dùng thư viện `core-decorators` thì không cần bind từng function như ở trên.

Decorator `@autobind` được khai báo trên class
```js
// No need to bind code-by-code anymore
@autobind
class App extends React.Component {
  ...
}
```
## <a id="chilrend" ></a>Chilrend types
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

## <a id="hocs" ></a>Higher-Order Components (HOCs)
Một HOCs là 1 kỹ thuật nâng cao trong React trong việc tái sử dụng (reusing) `component logic`. HOCs không nằm trong React API. Chúng là một mô hình nổi lên từ những tính chất tổng hợp của React.

Có 02 cách sử dụng HOCs: HOCs nhận props và trả về giá trị muốn trả về và HOCs là `wrapper logic` cho 1 hay nhiều component.
### HOCs nhận props và trả về giá trị
Thường được sử dụng chung `thư viện bên thứ 3 của React (third-party React libraries)` như `connect` của Redux hoặc truyền props 1 cách static nhất.
```js
const HOCs = (id, value) => {
  return id && value ? MyHOCs(id, value) : { id, value };
};

const MyHOCs = (id, value) => {
  return {
    newId: `this is my id: ${id}`,
    newValue: `this is my value: ${value}`
  };
};
```
Và khi sử dụng chung với `connect` của Redux
```js
function connectAutoDispatch(mapStateToProps, actions, ...args) {
  return connect(
    mapStateToProps,
    dispatch => bindActionCreators(actions, dispatch),
    ...args
  );
}

export default connectAutoDispatch(
  state => {
    return {
      ...HOCs(id: state.id, value: state.value)
    };
  },
  {}
)(WrapperComponent)
```
### HOCs bao gồm logic của Wrapped component
Một HOC chứa logic code của 1 component mà nó che phủ (wrapped)
```js
// ComponentLogic.js
import React from "react";

const componentLogic = WrapperComponent => {
  class Component extends React.Component {
    state = {
      text: "Hello World!!!"
    };

    onChange = e => {
      this.setState({
        text: e.target.value
      });
    };

    render() {
      return <WrapperComponent {...this.state} onChange={this.onChange} />;
    }
  }

  return Component;
};

export default componentLogic;
```
Có thể sử dụng HOC bằng 2 cách: `wrapped thông thường` hoặc sử dụng `decorator`
#### Wrapped thông thường
```js
// App.js
class App extends React.Component {
  ...
}
export default ComponentLogic(App);
```
#### Dùng decorator
```js
// App.js
@ComponentLogic
export default class App extends React.Component {
  ...
}
```
