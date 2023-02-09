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
  
export default Product;