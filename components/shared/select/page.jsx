// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import { cn } from '@/common/utils/cn';

// export default function AutoCompleteInput({
//     options = [],
//     onSelect,
//     placeholder = 'Select an option',
//     label = '',
//     required = false,
//     onErrorChange,
//     formSubmitted = false,
//     disabled = false,
//     labelKey = 'label',
//     value = '',
// }) {
//     const [showList, setShowList] = useState(false);
//     const [selected, setSelected] = useState(null);
//     const [touched, setTouched] = useState(false);
//     const wrapperRef = useRef(null);

//     useEffect(() => {
//         if (formSubmitted) setTouched(true);
//     }, [formSubmitted]);

//     useEffect(() => {
//         if (value) {
//             const matched = options.find(item => item[labelKey] === value);
//             if (matched) setSelected(matched);
//         } else {
//             setSelected(null);
//         }
//     }, [value, options, labelKey]);

//     const hasError = required && (touched || formSubmitted) && !selected;

//     useEffect(() => {
//         onErrorChange?.(hasError);
//     }, [hasError, onErrorChange]);

//     useEffect(() => {
//         const handleClickOutside = e => {
//             if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//                 setShowList(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     const handleSelect = item => {
//         setSelected(item);
//         setShowList(false);
//         onSelect?.(item);
//         setTouched(true);
//     };

//     return (
//         <div ref={wrapperRef} className="space-y-2 relative w-full">
//             {label && (
//                 <label
//                     className={cn(
//                         'text-sm font-medium leading-none',
//                         hasError ? 'text-destructive' : 'text-foreground'
//                     )}
//                 >
//                     {label}
//                     {required && <span className="text-destructive ml-1">*</span>}
//                 </label>
//             )}

//             {/* Dropdown input */}
//             <div
//                 onClick={() => !disabled && setShowList(prev => !prev)}
//                 className={cn(
//                     'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer',
//                     'ring-offset-background placeholder:text-muted-foreground',
//                     'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
//                     hasError && 'border-destructive focus-visible:ring-destructive',
//                     disabled && 'bg-gray-100 text-gray-500'
//                 )}
//             >
//                 <span className={cn(selected ? 'text-foreground' : 'text-muted-foreground')}>
//                     {selected ? selected[labelKey] : placeholder}
//                 </span>
//                 <span className="text-xs text-muted-foreground">▼</span>
//             </div>

//             {/* Dropdown list (always below) */}
//             {showList && (
//                 <ul
//                     className={cn(
//                         'absolute z-50 w-full bg-white border border-input rounded-md shadow-md max-h-48 overflow-y-auto text-sm mt-1',
//                         'top-full left-0'
//                     )}
//                 >
//                     {options.length > 0 ? (
//                         options.map((item, index) => (
//                             <li
//                                 key={index}
//                                 onMouseDown={e => e.preventDefault()}
//                                 onClick={() => handleSelect(item)}
//                                 className={cn(
//                                     'px-3 py-2 cursor-pointer transition-colors duration-150',
//                                     selected?.[labelKey] === item[labelKey]
//                                         ? 'bg-blue-500 text-white' // selected
//                                         : 'hover:bg-gray-100 hover:text-foreground' // hover
//                                 )}
//                             >
//                                 {item[labelKey]}
//                             </li>
//                         ))
//                     ) : (
//                         <li className="px-3 py-2 text-muted-foreground">No Data</li>
//                     )}
//                 </ul>
//             )}

//             {/* Error text */}
//             {!showList && hasError && (
//                 <p className="text-sm text-destructive">
//                     {label.split('(')?.[0] || 'Field'} is required
//                 </p>
//             )}
//         </div>
//     );
// }

'use client';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/common/utils/cn';

export default function AutoCompleteInput({
  options = [],
  onSelect,
  placeholder = 'Select an option',
  label = '',
  required = false,
  onErrorChange,
  formSubmitted = false,
  disabled = false,
  labelKey = 'label',
  value = '', // This will be the jobType ID
}) {
  const [showList, setShowList] = useState(false);
  const [selected, setSelected] = useState(null);
  const [touched, setTouched] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (formSubmitted) setTouched(true);
  }, [formSubmitted]);

  // ✅ Fix: Match by `value`, not label
  useEffect(() => {
    if (value) {
      const matched = options.find(item => item.value === value);
      if (matched) setSelected(matched);
    } else {
      setSelected(null);
    }
  }, [value, options]);

  const hasError = required && (touched || formSubmitted) && !selected;

  useEffect(() => {
    onErrorChange?.(hasError);
  }, [hasError, onErrorChange]);

  useEffect(() => {
    const handleClickOutside = e => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = item => {
    setSelected(item);
    setShowList(false);
    onSelect?.(item.value); // ✅ Only pass ID value
    setTouched(true);
  };

  return (
    <div ref={wrapperRef} className="space-y-2 relative w-full">
      {label && (
        <label
          className={cn(
            'text-sm font-medium leading-none',
            hasError ? 'text-destructive' : 'text-foreground'
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Dropdown input */}
      <div
        onClick={() => !disabled && setShowList(prev => !prev)}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer',
          'ring-offset-background placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          hasError && 'border-destructive focus-visible:ring-destructive',
          disabled && 'bg-gray-100 text-gray-500'
        )}
      >
        <span className={cn(selected ? 'text-foreground' : 'text-muted-foreground')}>
          {selected ? selected[labelKey] : placeholder}
        </span>
        <span className="text-xs text-muted-foreground">▼</span>
      </div>

      {/* Dropdown list */}
      {showList && (
        <ul
          className={cn(
            'absolute z-50 w-full bg-white border border-input rounded-md shadow-md max-h-48 overflow-y-auto text-sm mt-1',
            'top-full left-0'
          )}
        >
          {options.length > 0 ? (
            options.map((item, index) => (
              <li
                key={index}
                onMouseDown={e => e.preventDefault()}
                onClick={() => handleSelect(item)}
                className={cn(
                  'px-3 py-2 cursor-pointer transition-colors duration-150',
                  selected?.value === item.value
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 hover:text-foreground'
                )}
              >
                {item[labelKey]}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-muted-foreground">No Data</li>
          )}
        </ul>
      )}

      {!showList && hasError && (
        <p className="text-sm text-destructive">
          {label.split('(')?.[0] || 'Field'} is required
        </p>
      )}
    </div>
  );
}

