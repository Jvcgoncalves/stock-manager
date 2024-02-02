import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation} from 'swiper/modules'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function DashboardBoxes(){
  return(
    <Swiper
      navigation={true} // padding tira as setas de cima
      modules={[Navigation,Pagination]}
      grabCursor={true}
      pagination={{
        clickable:true,
        dynamicBullets: true,
      }}

      breakpoints={
        {
          1024: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          768:{
            slidesPerView:2,
            spaceBetween: 10
          }
        }
      }
      className="my-4"
    >
      <SwiperSlide 
      className="d-flex flex-column p-2 shadow-sm"
      >
        <span className="fs-5">Diversidade de itens</span>
        <span className="display-4 my-2 d-flex justify-content-center align-items-center h-100">1</span>
      </SwiperSlide>
      <SwiperSlide 
      className="d-flex flex-column p-2 shadow-sm"
      >
        <span className="fs-5">Inventário total</span>
        <span className="display-4 my-2 d-flex justify-content-center align-items-center h-100">1</span>
      </SwiperSlide>
      <SwiperSlide 
      className="d-flex flex-column p-2 shadow-sm"
      >
        <span className="fs-5">Itens recentes</span>
        <span className="display-4 my-2 d-flex justify-content-center align-items-center h-100">1</span>
      </SwiperSlide>
      <SwiperSlide 
      className="d-flex flex-column p-2 shadow-sm"
      >
        <span className="fs-5">Itens acabando</span>
        <span className="display-4 my-2 d-flex justify-content-center align-items-center h-100">1</span>
      </SwiperSlide>
    </Swiper>
  )
}

{/* <div className="swiper-slide d-flex flex-column">
          <span>Diversidade de itens</span>
          <span>1</span>
        </div>
        <div className="swiper-slide d-flex flex-column">
          <span>Inventário total</span>
          <span>1</span>
        </div>
        <div className="swiper-slide d-flex flex-column">
          <span>Itens recentes</span>
          <span>1</span>
        </div>
        <div className="swiper-slide d-flex flex-column">
          <span>Itens acabando</span>
          <span>1</span>
        </div> */}