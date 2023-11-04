const ImageSlider = ({ images }: any) => {
  return (
    <div className='carousel w-full h-full '>
      {images?.map((item: { public_Id: string; url: string }, i: number) => (
        <div
          id={`slide${i + 1}`}
          className='carousel-item relative w-full'
          key={crypto.randomUUID() + 45}
        >
          <img src={item.url} className='w-full object-cover' />
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a
              href={i === 0 ? `#slide${2}` : `#slide${1}`}
              className='btn btn-circle'
            >
              ❮
            </a>
            <a
              href={i === 1 ? `#slide${1}` : `#slide${2}`}
              className='btn btn-circle'
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
