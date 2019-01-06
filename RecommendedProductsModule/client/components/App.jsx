import React from 'react';
import axios from 'axios';
import Accessories from './Accessories.jsx';
import QuickView from './QuickView.jsx';
import RelatedItems from './RelatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currProduct: {
        productID: 0,
        name: 'Apple iPad 9.7" Wi-Fi Only (2018 Model, 6th Generation)',
        price: '499.99',
        imageURL:
          'https://target.scene7.com/is/image/Target/GUEST_358cafbc-644b-46cd-a0e3-66b8a6763a75?wid=325&hei=325&qlt=80&fmt=webp',
        categoryName: 'appleTablets',
      },
      accessories: [],
      relatedItems: [],
      viewHistory: false,
      pastItems: [],
      visible: false,
      currQuickView: {},
    };

    this.shuffleRelatedItems = this.shuffleRelatedItems.bind(this);
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
    this.getViewHistory = this.getViewHistory.bind(this);
    this.getRelatedItems = this.getRelatedItems.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setCurrQuickView = this.setCurrQuickView.bind(this);
  }

  componentDidMount() {
    this.getInitialAccessories();
    this.getInitialRelatedItems();
    this.getPastItems();
  }

  getInitialAccessories() {
    axios
      .get('http://localhost:3003/items/accessories/ipad')
      .then(results => {
        this.setState({
          accessories: results.data,
        });
      })
      .catch(err => {
        console.log("there was an error with currProduct's accessories get request: ", err);
      });
  }

  getInitialRelatedItems() {
    axios
      .get('http://localhost:3003/items/relatedItems/ipad')
      .then(results => {
        console.log('related items', results);
        this.setState({
          relatedItems: this.shuffleRelatedItems(results.data),
        });
      })
      .catch(err => {
        console.log("there was an error with the currProduct's related items get request: ", err);
      });
  }

  getPastItems() {
    axios
      .get('http://localhost:3003/items/savedProduct')
      .then(results => {
        if (results.data.length > 12) {
          results.data = results.data.slice(-12);
        }
        let reversedResults = results.data.reverse();
        this.setState({
          pastItems: reversedResults,
        });
      })
      .catch(err => {
        console.log('there was an error with the pastItems get request: ', err);
      });
  }

  saveCurrProduct({ productID, name, price, imageURL, categoryName }) {
    console.log(productID, name, price);
    axios
      .post('items/saveProduct', {
        productID: productID,
        name: name,
        price: price,
        imageURL: imageURL,
        categoryName: categoryName,
      })
      .then(response => {
        this.getPastItems();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeCurrentProduct(e) {
    let clickedURL = e.target.dataset.imageurl;
    let categoryNameData = e.target.dataset.categoryname;
    let productID = e.target.dataset.productid;
    let name = e.target.dataset.name;
    let price = e.target.dataset.price;

    console.log(e.target);

    console.log('heyyyy', e.target.dataset.price);

    axios
      .get(`/items/changeProduct/${e.target.dataset.categoryname}`)
      .then(results => {
        this.setState({
          currProduct: {
            productID: productID,
            name: name,
            price: price,
            imageURL: clickedURL,
            categoryName: categoryNameData,
          },
          accessories: results.data.accessories,
          relatedItems: this.shuffleRelatedItems(results.data),
        });

        this.saveCurrProduct(this.state.currProduct);
        this.getRelatedItems();
      })
      .catch(err => {
        console.log(
          "there was an error with the changeProduct's accessory & related items get request: ",
          err,
        );
      });
  }

  shuffleRelatedItems(data) {
    let productsMax = Math.floor(Math.random() * 4) + 3;
    let productsMin = Math.floor(Math.random() * 3);
    let randomProductsNum = Math.floor(Math.random() * 80);
    let relatedItemsList = [];

    if (this.state.currProduct.categoryName === 'appleTablets') {
      relatedItemsList = [
        ...data.appleProducts.slice(productsMin, productsMax),
        ...data.nonAppleProducts.slice(productsMin, productsMax),
        ...data.randomProducts.slice(randomProductsNum),
      ];
    } else if (this.state.currProduct.categoryName === 'non_Apple_Tablets') {
      relatedItemsList = [
        ...data.nonAppleProducts.slice(productsMin, productsMax),
        ...data.appleProducts.slice(productsMin, productsMax),
        ...data.randomProducts.slice(randomProductsNum),
      ];
    } else {
      relatedItemsList = [
        ...data.randomProducts.slice(randomProductsNum, randomProductsNum + 8),
        ...data.appleProducts.slice(0, productsMax),
        ...data.nonAppleProducts.slice(productsMin, productsMax),
      ];
    }
    return relatedItemsList.length > 12 ? relatedItemsList.slice(0, 12) : relatedItemsList;
  }

  getViewHistory() {
    this.setState({
      viewHistory: true,
    });
  }

  getRelatedItems() {
    this.setState({
      viewHistory: false,
    });
  }

  openModal() {
    this.setState({
      visible: true,
    });
  }

  closeModal() {
    this.setState({
      visible: false,
    });
  }

  setCurrQuickView(e) {
    let imageURL = e.target.dataset.imageurl;
    let categoryName = e.target.dataset.categoryname;
    let productID = e.target.dataset.productid;
    let name = e.target.dataset.name;
    let price = e.target.dataset.price;

    this.setState(
      {
        currQuickView: {
          imageURL,
          categoryName,
          productID,
          name,
          price,
        },
      },
      this.openModal,
    );
  }

  render() {
    return (
      <React.Fragment>
        <div id="MockData">
          <h1>Current Product</h1>
          <p>This section is an example</p>
          <div id="MockImageData">
            <img src={this.state.currProduct.imageURL} />
          </div>
        </div>
        <div id="wrapper">
          <div class="accessories">
            <div class="accessoryHead">
              {' '}
              <b class="bigHeader">Consider these accessories</b>{' '}
            </div>
            <Accessories accessories={this.state.accessories} />
          </div>
          <div class="relatedItems">
            <div class="relatedItemsHead">
              <b class="bigHeader">Recommended</b>
            </div>
            <div id="recViewOptions">
              <span class="choice" onClick={this.getRelatedItems}>
                Other recommendations
              </span>
              <span class="choice" onClick={this.getViewHistory}>
                Recently viewed items
              </span>
            </div>
            <QuickView
              data={this.state.currQuickView}
              modal={this.state.visible}
              closeModal={this.closeModal}
            />
            <RelatedItems
              relatedProducts={
                this.state.viewHistory ? this.state.pastItems : this.state.relatedItems
              }
              func={this.changeCurrentProduct}
              setQuickView={this.setCurrQuickView}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
