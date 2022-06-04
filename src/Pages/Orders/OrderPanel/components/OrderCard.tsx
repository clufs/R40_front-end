import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material'
import { DragEvent } from 'react';
import { OrderItems } from '../../../../features/orders/interfaces';
import { useAppSelector } from '../../../../Redux/hooks';
import { useDispatch } from 'react-redux';
import { setDragging } from '../../../../features/ui/ui.slice';

interface OrderCardProps {
  order: OrderItems
}

export const OrderCard = ({ order }: OrderCardProps) => {

  const dispatch = useDispatch()



  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("text", order._id);
    dispatch(setDragging(true))
    
  };

  const onDragEnd = () => {
    dispatch(setDragging(false))
  };




  return (
    <Card 
      draggable
      sx={{marginBottom: 1}}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            <strong>Producto:</strong> {order.product}
          </Typography>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            <strong>Talle:</strong> {order.size}
          </Typography>
          <Typography>
            <strong>Cantidad:</strong> {order.cant} unidades
          </Typography>
          <Typography>
            <strong>Precio:</strong> ${order.price} | <strong>Ganancia: </strong> ${order.profit}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card >
  )
}
