import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

export default function Slider({ items, renderItem, slidesPerView = 4 }) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView },
        }}
      >
        {items.map((it) => (
          <SwiperSlide key={it._id || it.id}>{renderItem(it)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
