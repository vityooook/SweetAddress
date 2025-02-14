import { SVGProps } from "react";

export const Logo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="57"
      height="57"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_444_82"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="57"
        height="57"
      >
        <circle cx="28.0547" cy="28.8983" r="28" fill="white" />
      </mask>
      <g mask="url(#mask0_444_82)">
        <g filter="url(#filter0_d_444_82)">
          <circle cx="28.0547" cy="28.8983" r="28" fill="#FAA5D1" />
        </g>
        <path
          d="M21.6181 64.1114C17.0219 64.1114 12.4924 63.3787 8.02948 61.9132C3.63317 60.3812 -0.0970358 58.183 -3.16113 55.3188L3.33342 43.6286C6.59735 45.7601 9.72806 47.4254 12.7255 48.6244C15.7896 49.8234 18.554 50.4229 21.0186 50.4229C22.4174 50.4229 23.4499 50.2563 24.116 49.9233C24.7821 49.5236 25.1152 48.8908 25.1152 48.0249C25.1152 47.4254 24.882 46.9258 24.4157 46.5261C23.9495 46.1265 23.1834 45.7268 22.1177 45.3271C21.1185 44.9275 19.8196 44.4945 18.2209 44.0282C14.0911 42.5628 10.6273 41.1973 7.82965 39.9317C5.09861 38.6661 3.03367 37.134 1.63485 35.3355C0.302629 33.4704 -0.363479 31.0058 -0.363479 27.9417C-0.363479 24.3447 0.535767 21.1807 2.33426 18.4497C4.13275 15.652 6.69727 13.4539 10.0278 11.8552C13.425 10.2565 17.4882 9.45721 22.2176 9.45721C25.748 9.45721 29.2783 10.0234 32.8087 11.1558C36.4057 12.2216 39.8694 14.1866 43.2 17.0508L36.006 28.6411C32.6755 26.5762 29.8445 25.1108 27.5131 24.2448C25.2484 23.3789 23.2167 22.9459 21.4183 22.9459C20.5523 22.9459 19.7863 23.0458 19.1202 23.2456C18.5207 23.4455 18.0544 23.7452 17.7214 24.1449C17.3883 24.5446 17.2218 25.0774 17.2218 25.7436C17.2218 26.4097 17.4549 26.9759 17.9212 27.4421C18.3875 27.8418 19.1202 28.2415 20.1193 28.6411C21.1185 28.9742 22.3841 29.3738 23.9162 29.8401C28.4457 31.1723 32.1426 32.5379 35.0069 33.9367C37.8711 35.2689 39.9694 36.9009 41.3016 38.8326C42.7004 40.7643 43.3998 43.2955 43.3998 46.4262C43.3998 51.9549 41.4348 56.2846 37.5048 59.4153C33.6413 62.546 28.3458 64.1114 21.6181 64.1114Z"
          fill="black"
        />
      </g>
      <path
        d="M50.6636 1.79352C50.7645 1.52092 51.15 1.52092 51.2509 1.79352L52.2566 4.5114C52.2883 4.5971 52.3559 4.66468 52.4416 4.69639L55.1595 5.7021C55.4321 5.80297 55.4321 6.18853 55.1595 6.2894L52.4416 7.29511C52.3559 7.32682 52.2883 7.39439 52.2566 7.4801L51.2509 10.198C51.15 10.4706 50.7645 10.4706 50.6636 10.198L49.6579 7.4801C49.6262 7.39439 49.5586 7.32682 49.4729 7.29511L46.755 6.2894C46.4824 6.18853 46.4824 5.80297 46.755 5.7021L49.4729 4.69639C49.5586 4.66468 49.6262 4.5971 49.6579 4.5114L50.6636 1.79352Z"
        fill="currentColor"
      />
      <defs>
        <filter
          id="filter0_d_444_82"
          x="0.0546875"
          y="0.898254"
          width="56"
          height="59"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_444_82"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_444_82"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
