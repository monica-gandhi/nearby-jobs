'use client';
import React, { useRef } from 'react';
import { cn } from '../../../common/utils/cn';
import Icon from '../../layout/AppIcon';

const FileUpload = React.forwardRef(({
    label,
    description,
    error,
    multiple = false,
    accept = '*',
    onChange,
    className,
    required = false,
    ...props
}, ref) => {
    const inputRef = ref || useRef();

    const handleFileChange = (e) => {
        const files = multiple ? Array.from(e.target.files) : e.target.files[0];
        onChange && onChange(files);
    };

    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <label className={cn('text-sm font-medium', error ? 'text-destructive' : 'text-foreground')}>
                    {label} {required && <span className="text-destructive ml-1">*</span>}
                </label>
            )}
            <div className="flex items-center space-x-3">
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    <Icon name="Upload" size={18} className="mr-2" />
                    Upload {multiple ? 'Files' : 'File'}
                </button>
                <span className="text-sm text-gray-600">
                    {multiple
                        ? props.files && props.files.length > 0
                            ? `${props.files.length} file(s) selected`
                            : 'No files selected'
                        : props.files
                            ? props.files.name
                            : 'No file selected'}
                </span>
            </div>
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                multiple={multiple}
                accept={accept}
                onChange={handleFileChange}
                {...props}
            />
            {description && !error && <p className="text-sm text-muted-foreground">{description}</p>}
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
});

FileUpload.displayName = 'FileUpload';
export default FileUpload;
