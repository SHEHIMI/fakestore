import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ProductList = () => {
  // States
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [openProduct, setOpenProduct] = React.useState(false);

  // Functions and effects
  React.useEffect(() => {
    // Fetch data from API using JS fetch
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        // on fetch, bring the order back
        const savedOrder = JSON.parse(sessionStorage.getItem("productOrder"));
        if (savedOrder) {
          setProducts(
            savedOrder.map((id) => data.find((product) => product.id === id))
          );
        } else {
          setProducts(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle close function
  const handleClose = () => {
    setOpenProduct(false);
    setSelectedProduct(null); // Clear the selected product on close
  };

  // Drag and Drop functions

  // On drag start
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  // On drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("text/plain");
    if (draggedIndex !== index.toString()) {
      const reorderedProducts = Array.from(products);
      const [movedProduct] = reorderedProducts.splice(draggedIndex, 1);
      reorderedProducts.splice(index, 0, movedProduct);
      setProducts(reorderedProducts);
      // Persist order using session storage to keep the order on page refresh
      sessionStorage.setItem(
        "productOrder",
        JSON.stringify(reorderedProducts.map((product) => product.id))
      );
    }
  };

  return (
    // JSX
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Product List
      </Typography>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} draggable="true">
            <Card
              onClick={() => {
                setSelectedProduct(product);
                setOpenProduct(true);
              }}
              sx={{
                boxShadow: 2,
                cursor: "pointer",
                borderRadius: 2,
              }}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <CardMedia
                component="img"
                height="140"
                image={product.images[0]} // First image of the product from the API
                alt={product.title}
              />
              <CardContent sx={{ minHeight: 100 }}>
                <Typography variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: "bold" }}
                >
                  Price: ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* MUI Dialog for popup */}
      <Dialog
        open={openProduct}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        {selectedProduct && (
          <>
            <DialogTitle id="dialog-title">{selectedProduct.title}</DialogTitle>
            {/* large jumbotron image */}
            <CardMedia
              component="img"
              height="300"
              width={"500"}
              image={selectedProduct.images[1]}
              sx={{
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              alt={selectedProduct.title}
            />
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                {selectedProduct.description}
              </Typography>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Price: ${selectedProduct.price}
              </Typography>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Category: {selectedProduct.category.name}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ProductList;

// Dnd Reference: https://medium.com/@future_fanatic/how-to-create-drag-and-drop-functionality-in-javascript-a-step-by-step-tutorial-8ea236ef9416
