export function PageHeader({
  title,
  subtitle,
  children
}) {
  return (
    <>
      {/* Blok 1: Header & Tombol Tambah */}
      <div className="flex justify-between items-end py-4">
        <div>
          <div className="font-bold text-3xl text-gray-900 tracking-tight">{ title }</div>
          <div className="text-sm text-gray-500 mt-2 mb-8">
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