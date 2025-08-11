export function LoadingSpinner() {
  return (
    <div className="relative w-full h-150 py-20 flex items-center justify-center">
      <div className="border-[#F96D00]/20 border-t-[#F96D00] rounded-full animate-spin w-16 h-16 border-4"></div>
    </div>
  );
}

export default LoadingSpinner;
