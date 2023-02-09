import { useState, useEffect } from 'react';
import './Product.css';

function Product() {
	const [items, setItems] = useState([]);
	const [total, setTotal] = useState(0.0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getData = async () => {
		  try {
			const response = await fetch(
			  `http://localhost:8084/api/`
			);
			if (!response.ok) {
			  throw new Error(
				`This is an HTTP error: The status is ${response.status}`
			  );
			}
			let actualData = await response.json();
			setItems(actualData);
			setError(null);
		  } catch(err) {
			setError(err.message);
			setItems(null);
		  } finally {
			setLoading(false);
		  }  
		}
		getData()
	}, [])
	

	const calculateTotal = () => {
		let sum = 0;
		items.forEach((item) => {
		  sum += parseFloat(item.price_ht) * (item.qty || 0);
		});
		return sum;
	  }
	
	useEffect(() => {
		setTotal(calculateTotal());
	}, [items])
	
	const handleQuantityChange = (index, qty) => {
		const updatedItems = [...items];
		updatedItems[index].qty = qty;
		setItems(updatedItems);
	};

	if (loading) {
		return <div>Please, wait a moment...</div>;
	}
	
	return (
		<div className='Product'>
		{loading && <div>A moment please...</div>}
		{error && (
			<div>{`There is a problem fetching the post data - ${error}`}</div>
		)}
		<div id="table" class="card">
			<div class="card mb-3" >
 				<div class="row g-0">
 					<div class="col-md-2">
 					</div>
 					<div class="col-md-3">
 						<div class="card-body">
 							<h6 class="title">NAME</h6>
 						</div>
 					</div>
 					<div class="col-md-3">
 						<div class="card-body">
 							<h6 class="title">QUANTITY</h6>
 						</div>
 					</div>
 					<div class="col-md-2">
 						<div class="card-body">
 							<h6 class="title">PRICE</h6>
 						</div>
 					</div>
 					<div class="col-md-2">
 						<div class="card-body">
 							<h6 class="title">SUBTOTAL</h6>
 						</div>
 					</div>
 				</div>
 			</div>
			{items && items.map((item, index) => (
				<div class="card mb-3" >
					<div class="row g-0">
						<div class="col-md-2">
							<img src={item.picture} class="img-fluid rounded-start" alt="{product} picture"/>
						</div>
						<div class="col-md-3">
							<div class="card-body">
								<h5 id="itemName" class="card-title">{item.product}</h5>
							</div>
						</div>
						<div class="col-md-1">
							<div class="card-body">
								<input
									class="form-control"
									type="number"
									value={item.qty || 0}
									min="0"
									onChange={(event) => handleQuantityChange(index, event.target.value)}
								/>
							</div>
						</div>
						<div class="col-md-2">
							<div class="card-body"><h5 class="card-title">{item.unit}</h5>
							</div>
						</div>
						<div class="col-md-2">
							<div class="card-body">
							<h5 class="card-title">{item.price_ht}</h5>
							</div>
						</div>

						<div class="col-md-2">
 						<div class="card-body">
 							<h5 class="card-title">{item.price_ht * (item.qty || 0)}</h5>
 						</div>
 					</div>
					</div>
				</div>
          	))}
			<div class="row justify-content-end">
				<div class="col-auto">
					<h3>
						Total: <b>{total}</b>
					</h3>
				</div>
				<div class="col-auto">
					<button type="button" class="btn btn-success">Place Order</button>
				</div>
			</div>
    	</div>
		</div>
  	);
}

// function Product() {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

// 	useEffect(() => {
// 		const getData = async () => {
// 		  try {
// 			const response = await fetch(
// 			  `http://localhost:8084/api/`
// 			);
// 			if (!response.ok) {
// 			  throw new Error(
// 				`This is an HTTP error: The status is ${response.status}`
// 			  );
// 			}
// 			let actualData = await response.json();
// 			setData(actualData);
// 			setError(null);
// 		  } catch(err) {
// 			setError(err.message);
// 			setData(null);
// 		  } finally {
// 			setLoading(false);
// 		  }  
// 		}
// 		getData()
// 	}, [])

// 	const [cost, setCost] = useState('')

// 	const handleChange = (event) => {
// 		// 👇 Get input value from "event"
// 		setCost(event.target.value);
// 	}

//     return (
// 		<div className='Product'>
// 			{loading && <div>A moment please...</div>}
// 			{error && (
// 				<div>{`There is a problem fetching the post data - ${error}`}</div>
// 			)}

// 			<div class="card mb-3" >
// 				<div class="row g-0">
// 					<div class="col-md-2">
// 					</div>
// 					<div class="col-md-6">
// 						<div class="card-body">
// 							<h5 class="card-title">Name</h5>
// 						</div>
// 					</div>
// 					<div class="col-md-2">
// 						<div class="card-body">
// 							<h5 class="card-title">Amount</h5>
// 						</div>
// 					</div>
// 					<div class="col-md-2">
// 						<div class="card-body">
// 							<h5 class="card-title">Cost</h5>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			{data &&
// 			data.map(({ product, picture }) => (
// 				<div class="card mb-3" >
// 					<div class="row g-0">
// 						<div class="col-md-2">
// 							<img src={picture} class="img-fluid rounded-start" alt="{product} picture"/>
// 						</div>
// 						<div class="col-md-6">
// 							<div class="card-body">
// 								<h5 class="card-title">{product}</h5>
// 							</div>
// 						</div>
// 						<div class="col-md-2">
// 							<div class="card-body">
// 								<input class="form-control" type="number" id="amount" name="amount" min="0" onChange={handleChange} />
// 							</div>
// 						</div>
// 						<div class="col-md-2">
// 							<div class="card-body">
// 							<h5 class="card-title">{cost}</h5>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			))}
// 		</div>
//     );
// }
  
export default Product;


// antes de mesclar
// return (
// 	<div className='Product'>
// 	{loading && <div>A moment please...</div>}
// 	{error && (
// 		<div>{`There is a problem fetching the post data - ${error}`}</div>
// 	)}
// 	<div>
// 	  <h2>Store Checkout</h2>
// 	  <table>
// 		<thead>
// 		  <tr>
// 			<th>Name</th>
// 			<th>Price</th>
// 			<th>Quantity</th>
// 			<th>Subtotal</th>
// 		  </tr>
// 		</thead>
// 		<tbody>	
// 		{items && items.map((item, index) => (
// 		<tr key={item.product}>
// 		  <td>{item.product}</td>
// 		  <td>{item.price_ht}</td>
// 		  <td>
// 			<input
// 			  type="number"
// 			  value={item.qty || 0}
// 			  min="0"
// 			  onChange={(event) => handleQuantityChange(index, event.target.value)}
// 			/>
// 		  </td>
// 		  <td>{item.price_ht * (item.qty || 0)}</td>
// 		</tr>
// 	  ))}
// 	</tbody>
//   </table>
//   <p>
// 	Total: <b>{total}</b>
//   </p>
// </div>
// </div>
//   );