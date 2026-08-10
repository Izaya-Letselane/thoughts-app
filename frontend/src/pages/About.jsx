

const About = () => {
  return (
    <div className="mx-auto mb-5 max-w-5xl px-6 py-16 lg:px-8">
        
        <div className="text-center mb-5">
          
          <p data-aos="fade-left" className="mb-4 text-2xl font-bold uppercase tracking-widest text-rose-500">
            
            About Us
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-rose-700">
            
            A place for your thoughts, memories, and everyday moments.{" "}
          </h1>
          <p data-aos="fade-left" className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-rose-600">
            
            Life moves quickly, and it is easy to forget the small moments that
            make each day meaningful. Our platform gives you a simple and
            personal space to write, document your experiences, and keep a
            record of the life you are living.{" "}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-rose-700">
            
            Whether you want to reflect on your day, capture an important
            memory, express how you feel, or simply put your thoughts into
            words, this is your space to make those moments last.
          </p>
        </div>

        <div data-aos="fade-right" className="mt-16 grid gap-8 sm:grid-cols-3 ">
          
          <div className="rounded-2xl border border-rose-600 bg-rose-600 p-6 text-center">
            
            <h2 className="text-xl font-semibold text-amber-50">
              
              Write
            </h2>
            <p data-aos="fade-right" className="mt-3 leading-6 text-amber-50">
              
              Put your thoughts, feelings, and experiences into words.
            </p>
          </div>
          <div className="rounded-2xl border border-rose-100 bg-rose-500 p-6 text-center">
            
            <h2 className="text-xl font-semibold text-amber-50">
              
              Reflect
            </h2>
            <p data-aos="fade-right" className="mt-3 leading-6 text-amber-50">
              
              Take time to look back and learn from your everyday
              experiences.
            </p>
          </div>
          <div className="bg-rose-500 text-white rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center">
            
            <h2 className="text-xl font-semibold text-amber-50">
              
              Remember
            </h2>
            <p data-aos="fade-right" className="mt-3 leading-6 text-amber-50">
              
              Keep a personal record of the moments that matter most.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-3xl text-center">
          
          <h2 className="text-3xl font-bold text-rose-600">
            
            Your story is worth remembering.
          </h2>
          <p data-aos="fade-left" className="mt-5 text-lg leading-8 text-rose-500">
            
            There is no right or wrong way to document your life. Start with a
            thought, a feeling, a memory, or simply describe your day. Over
            time, these small entries can become a meaningful record of your
            journey.
          </p>
        </div>
      </div>
  )
}

export default About