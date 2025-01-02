import { cn } from "@/lib/utils";


const Spiner: React.FC<{ className?: string }> = ({ className }) => {

  return (
    <span className={cn('loader', className)}></span>
  );
};

export default Spiner;