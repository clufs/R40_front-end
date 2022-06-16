import { Paper, List } from '@mui/material'
import { DragEvent, useMemo } from 'react'
import { OrderCard } from './OrderCard'
import { useAppSelector, useAppDispatch } from '../../../../Redux/hooks';
import { StatusProps } from '../../../../features/orders/interfaces';
import { startUpdateOrderItemStatus } from '../../../../features/orders/orders.slice';


interface props{
  status: StatusProps;
}

export const OrderList = ({ status }: props) => {

  const { selected } = useAppSelector(state => state.orders);
  const { isDragging } = useAppSelector( state => state.ui)

  const dispatch = useAppDispatch();

  const ordersByStatus = useMemo(() => selected.Order.filter((orders) => orders.status === status), [selected.Order]);




  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };


  const onDropOrder = (event: DragEvent) => {
    const id = event.dataTransfer.getData('text');
    const order = selected.Order.find( e => e._id === id)!;

    
    const newOrder = {
      ...order,
      status
    };

    dispatch(startUpdateOrderItemStatus(selected._id, newOrder.status, id));
  }; 


  return (
    <div
      onDrop={ onDropOrder }
      onDragOver= { allowDrop }

      >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          "&::-webkit-scrollbar": { display: "none" },
          padding: "1px 5px",
        }}
      >

        <List sx={{ opacity: isDragging ? 0.2 : 1 , transition: 'all 0.3s'}}>
          {
            ordersByStatus.map((order) => (
                <OrderCard order={order} key={order._id}/>
            ))
          }
        </List>
      </Paper>
    </div>
  )
}
