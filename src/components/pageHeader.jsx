export function PageHeader({
  title,
  subtitle,
  children
}) {
  return (
    <>
      {/* Header & Tombol Tambah */}
      <div className="flex justify-between items-center py-4">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-3xl text-gray-900 tracking-tight">{ title }</div>
          <div className="text-sm text-gray-500">
            { subtitle }
          </div>
        </div>

        {/* Tombol Tambah */}
        { children && (
          <div>
            { children }
          </div>
        )}
      </div>
    </>
  )
}