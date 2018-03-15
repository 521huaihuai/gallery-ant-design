import Icon, { Steps, Button, message } from 'antd';
import styles from './StepExt.less'

const Step = Steps.Step;

const steps = [{
  title: '注册',
  content: 'First-content',
}, {
  title: '绑定',
  content: 'Second-content',
}, {
  title: '支付',
  content: 'third-content',
  status: 'process',
  // icon: <Icon type="loading" />
}, {
  title: '验证',
  content: 'Last-content',
}];

class StepExt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      icon:null,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  Check() {
    const current = this.state.current + 1;
    this.setState({ current

    });
    
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className={styles.stepExt}>{steps[this.state.current].content}</div>
        <div className={styles.action}>
          {
            this.state.current < steps.length - 1
            &&
            (this.state.current === 2
              &&
              <Button type="primary" onClick={() => {
                this.Check()
              }}>支付</Button> || <Button type="primary" onClick={() => this.next()}>Next</Button>)
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          }
        </div>
      </div>
    );
  }
}

// ReactDOM.render(<App />, mountNode);
export default StepExt;