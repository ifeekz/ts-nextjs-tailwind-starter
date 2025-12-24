export default function Loading() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fillOpacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div> */}

      {/* Floating Elements */}
      <div className='absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
      <div className='absolute top-40 right-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
      <div className='absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>

      <div className='relative w-full max-w-md'>
        {/* Loading Card */}
        <div className='bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8'>
          <div className='text-center'>
            {/* Loading Spinner */}
            <div className='w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-6'>
              <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            </div>

            <div className='space-y-4'>
              <div className='h-8 bg-white/20 rounded-lg animate-pulse'></div>
              <div className='h-4 bg-white/10 rounded animate-pulse'></div>
              <div className='space-y-3 mt-8'>
                <div className='h-12 bg-white/10 rounded-lg animate-pulse'></div>
                <div className='h-12 bg-white/10 rounded-lg animate-pulse'></div>
                <div className='h-10 bg-white/20 rounded-lg animate-pulse'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
