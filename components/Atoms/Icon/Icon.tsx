import Image from 'next/image';
import { IconProps } from './types';



const Icon = ({
    src,
    alt,
    width = 20,
    height = 20,
    className = '',
    priority = false,
    ariaHidden = false,
}: IconProps) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority={priority}
            aria-hidden={ariaHidden}
        />
    );
};

export default Icon;    