import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useWizard } from "react-use-wizard";
import { setCategory, setCountStep, setProduct, setSubcategory } from "../../../features/products/select.slice";
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { ArrayAvalibleSubCategories, ArrayAvalibleProducts, getOneProduct } from '../../../features/products/avalibles.slice';


export const Category__Select = () => {

  const { category } = useAppSelector(state => state.avalible)
  const { products } = useAppSelector(state => state.products)
  const dispatch = useAppDispatch()

  const { nextStep, stepCount } = useWizard();

  const handleClickCategory = (category: string) => {
    dispatch(setCategory(category));
    dispatch(ArrayAvalibleSubCategories(products, category));
    dispatch(setCountStep(stepCount - 2));
    nextStep();
  };

  return (

    <Grid container spacing={2} sx={{
      display: 'flex',
      justifyContent: 'center',
      margin: 4
    }}  >
      {
        category.map((category) => {
          return (

            <Grid xs={6} key={category}>

              <Card
                sx={{ marginBottom: 1, display: 'flex', margin: 2 }}
                onClick={() => handleClickCategory(category)}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography sx={{ display: 'flex', justifyContent: 'center' }} color='black' variant='body1'>
                      {category}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })
      }
    </Grid>
  )
};

export const SubCategory__Select = () => {
  const {products} = useAppSelector(state => state.products)
  const {subCategory} = useAppSelector( state=> state.avalible)
  const {category} = useAppSelector( state => state.select)

  const dispatch = useAppDispatch()
  const { nextStep, stepCount } = useWizard();

  const handleClicSubCategory = (subCategory: string) => {
    dispatch(setSubcategory(subCategory));
    dispatch(setCountStep(stepCount - 1));
    dispatch(ArrayAvalibleProducts(products, subCategory, category));
    nextStep();
  };


  return (

    <Grid container spacing={2} sx={{
      display: 'flex',
      justifyContent: 'center',
      margin: 4
    }}  >
      {
        subCategory.map((subCategory) => {
          return (

            <Grid xs={6} key={subCategory}>

              <Card
                sx={{ marginBottom: 1, display: 'flex', margin: 2 }}
                onClick={() => handleClicSubCategory(subCategory)}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography sx={{ display: 'flex', justifyContent: 'center' }} color='black' variant='body1'>
                      {subCategory}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export const Product__Select = () => {

  const { product } = useAppSelector( state => state.avalible)
  const { category, subcategory } = useAppSelector( state => state.select)
  const { products } = useAppSelector( state => state.products)
  const dispatch = useAppDispatch()
  const { stepCount } = useWizard();


  const navigate = useNavigate()


  const handleClicSubCategory = (theProduct: string) => {
    dispatch(setProduct(theProduct));
    dispatch(setCountStep(stepCount - 1));
    dispatch(getOneProduct(products, category, subcategory, theProduct));
    navigate('/productos/producto');
  };

  return (
    <Grid container spacing={2} sx={{
      display: 'flex',
      justifyContent: 'center',
      margin: 4
    }}>
      {
        product.map((product) => {
          return (

            <Grid xs={6} key={product}>

              <Card
                sx={{ marginBottom: 1, display: 'flex', margin: 2 }}
                onClick={() => handleClicSubCategory(product)}
                key={product}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography sx={{ display: 'flex', justifyContent: 'center' }} color='black' variant='body1'>
                      {product}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })
      }
    </Grid>
  )
}

