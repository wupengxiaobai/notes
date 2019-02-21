import Header from './header'
import Footer from './footer'

var app = {
  template: `<div>app组件
                <Header />
                <Footer />
            </div>`,
  components: {
    Header,
    Footer
  }
}


export default app